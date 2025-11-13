// Mock IndexedDB implementation for testing
interface MockStore {
  [key: string]: any;
}

interface MockDB {
  users: MockStore;
  attendance: MockStore;
  settings: MockStore;
}

class MockDatabaseService {
  private mockData: MockDB = {
    users: {},
    attendance: {},
    settings: {},
  };

  // Reset mock data between tests
  reset() {
    this.mockData = {
      users: {},
      attendance: {},
      settings: {},
    };
  }

  // Mock database initialization
  async init(): Promise<void> {
    // Always succeeds in mock
    return Promise.resolve();
  }

  // Mock user operations (matching real interface)
  async getUsers(): Promise<any[]> {
    return Promise.resolve(Object.values(this.mockData.users));
  }

  async getUserById(id: string): Promise<any | undefined> {
    return Promise.resolve(this.mockData.users[id]);
  }

  async getUserByEmail(email: string): Promise<any | undefined> {
    const user = Object.values(this.mockData.users).find((u: any) => u.email === email);
    return Promise.resolve(user);
  }

  async addUser(user: any): Promise<void> {
    this.mockData.users[user.id] = { ...user, createdAt: new Date(), updatedAt: new Date() };
    return Promise.resolve();
  }

  async updateUser(user: any): Promise<void> {
    if (this.mockData.users[user.id]) {
      this.mockData.users[user.id] = { ...user, updatedAt: new Date() };
    }
    return Promise.resolve();
  }

  async deleteUser(id: string): Promise<void> {
    delete this.mockData.users[id];
    return Promise.resolve();
  }

  async getUsersByRole(role: string): Promise<any[]> {
    const users = Object.values(this.mockData.users).filter((u: any) => u.role === role);
    return Promise.resolve(users);
  }

  // Mock attendance operations (matching real interface)
  async getAttendanceRecords(): Promise<any[]> {
    return Promise.resolve(Object.values(this.mockData.attendance));
  }

  async getAttendanceById(id: string): Promise<any | undefined> {
    return Promise.resolve(this.mockData.attendance[id]);
  }

  async getAttendanceByUser(userId: string): Promise<any[]> {
    const records = Object.values(this.mockData.attendance).filter((r: any) => r.userId === userId);
    return Promise.resolve(records);
  }

  async getAttendanceByDate(date: string): Promise<any[]> {
    const records = Object.values(this.mockData.attendance).filter((r: any) => r.date === date);
    return Promise.resolve(records);
  }

  async getAttendanceByUserAndDate(userId: string, date: string): Promise<any | undefined> {
    const record = Object.values(this.mockData.attendance).find((r: any) => 
      r.userId === userId && r.date === date
    );
    return Promise.resolve(record);
  }

  async addAttendanceRecord(record: any): Promise<void> {
    this.mockData.attendance[record.id] = { ...record };
    return Promise.resolve();
  }

  async updateAttendanceRecord(record: any): Promise<void> {
    if (this.mockData.attendance[record.id]) {
      this.mockData.attendance[record.id] = { ...record };
    }
    return Promise.resolve();
  }

  async deleteAttendanceRecord(id: string): Promise<void> {
    delete this.mockData.attendance[id];
    return Promise.resolve();
  }

  async getAttendanceByDateRange(userId: string, startDate: string, endDate: string): Promise<any[]> {
    const records = Object.values(this.mockData.attendance).filter((record: any) => {
      return record.userId === userId && record.date >= startDate && record.date <= endDate;
    });
    return Promise.resolve(records);
  }

  // Mock settings operations (matching real interface)
  async getSetting(key: string): Promise<any> {
    const setting = this.mockData.settings[key];
    return Promise.resolve(setting ? setting.value : undefined);
  }

  async setSetting(key: string, value: any): Promise<void> {
    this.mockData.settings[key] = {
      key,
      value,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve();
  }

  async deleteSetting(key: string): Promise<void> {
    delete this.mockData.settings[key];
    return Promise.resolve();
  }

  async clearAllData(): Promise<void> {
    this.reset();
    return Promise.resolve();
  }

  // Mock export/import operations (if needed)
  async exportData(): Promise<any> {
    return Promise.resolve({
      users: { ...this.mockData.users },
      attendance: { ...this.mockData.attendance },
      settings: { ...this.mockData.settings },
    });
  }

  async importData(data: any): Promise<void> {
    this.mockData.users = data.users || {};
    this.mockData.attendance = data.attendance || {};
    this.mockData.settings = data.settings || {};
    return Promise.resolve();
  }
}

// Create a global mock instance
const mockDatabaseService = new MockDatabaseService();

export { mockDatabaseService };