import { mockDatabaseService } from './database.mock';

// Mock Authentication Service
class MockAuthenticationService {
  private currentUser: any = null;
  private authToken: string | null = null;

  async login(email: string, password: string): Promise<{ success: boolean; user?: any; error?: string }> {
    const user = await mockDatabaseService.getUserByEmail(email);
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    
    if (user.password !== password) {
      return { success: false, error: 'Invalid password' };
    }
    
    this.currentUser = user;
    this.authToken = `mock-token-${user.id}`;
    localStorage.setItem('auth-token', this.authToken);
    localStorage.setItem('current-user', JSON.stringify(user));
    
    return { success: true, user };
  }

  async register(userData: any): Promise<{ success: boolean; user?: any; error?: string }> {
    const existingUser = await mockDatabaseService.getUserByEmail(userData.email);
    
    if (existingUser) {
      return { success: false, error: 'Email already exists' };
    }
    
    const newUser = {
      id: `user_${Date.now()}`,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    await mockDatabaseService.addUser(newUser);
    
    return { success: true, user: newUser };
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    this.authToken = null;
    localStorage.removeItem('auth-token');
    localStorage.removeItem('current-user');
  }

  async getCurrentUser(): Promise<any | null> {
    if (this.currentUser) {
      return this.currentUser;
    }
    
    const storedUser = localStorage.getItem('current-user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      return this.currentUser;
    }
    
    return null;
  }

  async isAuthenticated(): Promise<boolean> {
    const token = localStorage.getItem('auth-token');
    return Boolean(token && (this.currentUser || localStorage.getItem('current-user')));
  }

  async hasRole(role: string): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user ? user.role === role : false;
  }

  async isAdmin(): Promise<boolean> {
    return this.hasRole('admin');
  }

  async isHR(): Promise<boolean> {
    return this.hasRole('hr');
  }

  async isEmployee(): Promise<boolean> {
    return this.hasRole('employee');
  }

  // Reset for testing
  reset() {
    this.currentUser = null;
    this.authToken = null;
    localStorage.removeItem('auth-token');
    localStorage.removeItem('current-user');
  }
}

// Mock Attendance Service (matching real interface)
class MockAttendanceService {
  async checkIn(userId: string, notes?: string): Promise<any> {
    const today = new Date().toISOString().split('T')[0];
    const existingRecord = await mockDatabaseService.getAttendanceByUserAndDate(userId, today);
    
    if (existingRecord && existingRecord.checkInTime) {
      throw new Error('Already checked in today');
    }
    
    const record = {
      id: `${userId}_${today}`,
      userId,
      date: today,
      checkInTime: new Date().toISOString(),
      status: 'present',
      breaks: [],
      notes,
    };
    
    await mockDatabaseService.addAttendanceRecord(record);
    return record;
  }

  async checkOut(userId: string, notes?: string): Promise<any> {
    const today = new Date().toISOString().split('T')[0];
    const record = await mockDatabaseService.getAttendanceByUserAndDate(userId, today);
    
    if (!record || !record.checkInTime) {
      throw new Error('Must check in first');
    }
    
    if (record.checkOutTime) {
      throw new Error('Already checked out today');
    }
    
    const updatedRecord = {
      ...record,
      checkOutTime: new Date().toISOString(),
      notes: notes || record.notes,
    };
    
    await mockDatabaseService.updateAttendanceRecord(updatedRecord);
    return updatedRecord;
  }

  async startBreak(userId: string): Promise<any> {
    const today = new Date().toISOString().split('T')[0];
    const record = await mockDatabaseService.getAttendanceByUserAndDate(userId, today);
    
    if (!record || !record.checkInTime) {
      throw new Error('Must check in first');
    }
    
    const breaks = record.breaks || [];
    const lastBreak = breaks[breaks.length - 1];
    
    if (lastBreak && !lastBreak.endTime) {
      throw new Error('Already on break');
    }
    
    breaks.push({
      startTime: new Date().toISOString(),
    });
    
    const updatedRecord = { ...record, breaks };
    await mockDatabaseService.updateAttendanceRecord(updatedRecord);
    return updatedRecord;
  }

  async endBreak(userId: string): Promise<any> {
    const today = new Date().toISOString().split('T')[0];
    const record = await mockDatabaseService.getAttendanceByUserAndDate(userId, today);
    
    if (!record || !record.checkInTime) {
      throw new Error('Must check in first');
    }
    
    const breaks = record.breaks || [];
    const lastBreak = breaks[breaks.length - 1];
    
    if (!lastBreak || lastBreak.endTime) {
      throw new Error('Not currently on break');
    }
    
    lastBreak.endTime = new Date().toISOString();
    
    const updatedRecord = { ...record, breaks };
    await mockDatabaseService.updateAttendanceRecord(updatedRecord);
    return updatedRecord;
  }

  async getTodayAttendance(userId: string): Promise<any | null> {
    const today = new Date().toISOString().split('T')[0];
    return mockDatabaseService.getAttendanceByUserAndDate(userId, today);
  }

  async getUserAttendance(userId: string, startDate?: string, endDate?: string): Promise<any[]> {
    if (startDate && endDate) {
      return mockDatabaseService.getAttendanceByDateRange(userId, startDate, endDate);
    }
    return mockDatabaseService.getAttendanceByUser(userId);
  }

  async getAllAttendance(date?: string): Promise<any[]> {
    if (date) {
      return mockDatabaseService.getAttendanceByDate(date);
    }
    return mockDatabaseService.getAttendanceRecords();
  }

  async getAttendanceStats(userId: string): Promise<any> {
    const records = await mockDatabaseService.getAttendanceByUser(userId);
    
    const presentDays = records.filter(r => r.status === 'present').length;
    const absentDays = records.filter(r => r.status === 'absent').length;
    const totalDays = records.length;
    
    return {
      totalDays,
      presentDays,
      absentDays,
      lateArrivals: 0,
      halfDays: 0,
      holidays: 0,
      attendancePercentage: totalDays > 0 ? (presentDays / totalDays) * 100 : 0,
      averageHoursWorked: 8,
    };
  }

  async markAbsent(userId: string, date: string, notes?: string): Promise<any> {
    const record = {
      id: `${userId}_${date}`,
      userId,
      date,
      status: 'absent',
      notes,
    };
    
    await mockDatabaseService.addAttendanceRecord(record);
    return record;
  }

  async markHoliday(date: string, notes?: string): Promise<void> {
    // In a real implementation, this would mark holiday for all users
    return Promise.resolve();
  }

  determineStatus(record: any): 'present' | 'absent' | 'late' | 'half-day' {
    if (!record || !record.checkInTime) {
      return 'absent';
    }
    
    const checkInTime = new Date(record.checkInTime);
    const checkInHour = checkInTime.getHours();
    
    if (checkInHour >= 10) {
      return 'late';
    }
    
    if (record.checkOutTime) {
      const checkOutTime = new Date(record.checkOutTime);
      const hoursWorked = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);
      
      if (hoursWorked < 4) {
        return 'half-day';
      }
    }
    
    return 'present';
  }
}

// Create global mock instances
const mockAuthService = new MockAuthenticationService();
const mockAttendanceService = new MockAttendanceService();

export { mockAuthService, mockAttendanceService };