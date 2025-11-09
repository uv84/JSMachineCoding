import { dbService } from './database';
import type { AttendanceRecord, AttendanceStats } from '../store/slices/attendanceSlice';

class AttendanceService {
  async checkIn(userId: string, notes?: string): Promise<AttendanceRecord> {
    const today = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toTimeString().split(' ')[0].slice(0, 5); // HH:MM format

    // Check if there's already a record for today
    let record = await dbService.getAttendanceByUserAndDate(userId, today);

    if (record) {
      // Update existing record
      record.checkIn = currentTime;
      record.status = this.determineStatus(currentTime);
      if (notes) record.notes = notes;
      record.updatedAt = new Date().toISOString();
      
      await dbService.updateAttendanceRecord(record);
    } else {
      // Create new record
      record = {
        id: this.generateAttendanceId(),
        userId,
        date: today,
        checkIn: currentTime,
        checkOut: null,
        breakStart: null,
        breakEnd: null,
        status: this.determineStatus(currentTime),
        notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await dbService.addAttendanceRecord(record);
    }

    return record;
  }

  async checkOut(userId: string, notes?: string): Promise<AttendanceRecord> {
    const today = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toTimeString().split(' ')[0].slice(0, 5);

    const record = await dbService.getAttendanceByUserAndDate(userId, today);
    if (!record) {
      throw new Error('No check-in record found for today');
    }

    record.checkOut = currentTime;
    if (notes) record.notes = notes;
    record.updatedAt = new Date().toISOString();

    // Calculate total hours
    if (record.checkIn) {
      record.totalHours = this.calculateTotalHours(record.checkIn, currentTime, record.breakStart, record.breakEnd);
    }

    await dbService.updateAttendanceRecord(record);
    return record;
  }

  async startBreak(userId: string): Promise<AttendanceRecord> {
    const today = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toTimeString().split(' ')[0].slice(0, 5);

    const record = await dbService.getAttendanceByUserAndDate(userId, today);
    if (!record || !record.checkIn) {
      throw new Error('Please check in first');
    }

    record.breakStart = currentTime;
    record.updatedAt = new Date().toISOString();

    await dbService.updateAttendanceRecord(record);
    return record;
  }

  async endBreak(userId: string): Promise<AttendanceRecord> {
    const today = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toTimeString().split(' ')[0].slice(0, 5);

    const record = await dbService.getAttendanceByUserAndDate(userId, today);
    if (!record || !record.breakStart) {
      throw new Error('No active break found');
    }

    record.breakEnd = currentTime;
    record.updatedAt = new Date().toISOString();

    await dbService.updateAttendanceRecord(record);
    return record;
  }

  async getTodayAttendance(userId: string): Promise<AttendanceRecord | null> {
    const today = new Date().toISOString().split('T')[0];
    const record = await dbService.getAttendanceByUserAndDate(userId, today);
    return record || null;
  }

  async getUserAttendance(userId: string, startDate?: string, endDate?: string): Promise<AttendanceRecord[]> {
    if (startDate && endDate) {
      return await dbService.getAttendanceByDateRange(userId, startDate, endDate);
    }
    return await dbService.getAttendanceByUser(userId);
  }

  async getAllAttendance(date?: string): Promise<AttendanceRecord[]> {
    if (date) {
      return await dbService.getAttendanceByDate(date);
    }
    return await dbService.getAttendanceRecords();
  }

  async getAttendanceStats(userId: string): Promise<AttendanceStats> {
    const records = await dbService.getAttendanceByUser(userId);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const currentMonthRecords = records.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear;
    });

    const totalPresent = records.filter(r => r.status === 'present').length;
    const totalAbsent = records.filter(r => r.status === 'absent').length;
    const totalLate = records.filter(r => r.status === 'late').length;
    const totalHalfDay = records.filter(r => r.status === 'half-day').length;

    const totalHours = records.reduce((sum, record) => sum + (record.totalHours || 0), 0);
    const averageHours = records.length > 0 ? totalHours / records.length : 0;

    const currentMonthPresent = currentMonthRecords.filter(r => r.status === 'present').length;
    const currentMonthAbsent = currentMonthRecords.filter(r => r.status === 'absent').length;
    const currentMonthLate = currentMonthRecords.filter(r => r.status === 'late').length;
    const currentMonthHalfDay = currentMonthRecords.filter(r => r.status === 'half-day').length;

    return {
      totalPresent,
      totalAbsent,
      totalLate,
      totalHalfDay,
      averageHours,
      currentMonth: {
        present: currentMonthPresent,
        absent: currentMonthAbsent,
        late: currentMonthLate,
        halfDay: currentMonthHalfDay,
      },
    };
  }

  async markAbsent(userId: string, date: string, notes?: string): Promise<AttendanceRecord> {
    let record = await dbService.getAttendanceByUserAndDate(userId, date);

    if (record) {
      record.status = 'absent';
      if (notes) record.notes = notes;
      record.updatedAt = new Date().toISOString();
      await dbService.updateAttendanceRecord(record);
    } else {
      record = {
        id: this.generateAttendanceId(),
        userId,
        date,
        checkIn: null,
        checkOut: null,
        breakStart: null,
        breakEnd: null,
        status: 'absent',
        notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await dbService.addAttendanceRecord(record);
    }

    return record;
  }

  async markHoliday(date: string, notes?: string): Promise<void> {
    const users = await dbService.getUsers();
    const promises = users.map(user => 
      this.markUserHoliday(user.id, date, notes)
    );
    await Promise.all(promises);
  }

  private async markUserHoliday(userId: string, date: string, notes?: string): Promise<void> {
    let record = await dbService.getAttendanceByUserAndDate(userId, date);

    if (record) {
      record.status = 'holiday';
      if (notes) record.notes = notes;
      record.updatedAt = new Date().toISOString();
      await dbService.updateAttendanceRecord(record);
    } else {
      record = {
        id: this.generateAttendanceId(),
        userId,
        date,
        checkIn: null,
        checkOut: null,
        breakStart: null,
        breakEnd: null,
        status: 'holiday',
        notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await dbService.addAttendanceRecord(record);
    }
  }

  private determineStatus(checkInTime: string): 'present' | 'late' {
    const standardCheckIn = '09:00'; // 9:00 AM
    return checkInTime <= standardCheckIn ? 'present' : 'late';
  }

  private calculateTotalHours(
    checkIn: string,
    checkOut: string,
    breakStart?: string | null,
    breakEnd?: string | null
  ): number {
    const checkInTime = this.timeToMinutes(checkIn);
    const checkOutTime = this.timeToMinutes(checkOut);
    
    let totalMinutes = checkOutTime - checkInTime;

    // Subtract break time if both break start and end are recorded
    if (breakStart && breakEnd) {
      const breakStartMinutes = this.timeToMinutes(breakStart);
      const breakEndMinutes = this.timeToMinutes(breakEnd);
      totalMinutes -= (breakEndMinutes - breakStartMinutes);
    }

    return totalMinutes / 60; // Convert to hours
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private generateAttendanceId(): string {
    return `att_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export const attendanceService = new AttendanceService();