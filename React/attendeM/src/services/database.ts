import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';
import type { User } from '../store/slices/authSlice';
import type { AttendanceRecord } from '../store/slices/attendanceSlice';

interface AttendanceDB extends DBSchema {
  users: {
    key: string;
    value: User;
    indexes: {
      'by-email': string;
      'by-role': string;
    };
  };
  attendance: {
    key: string;
    value: AttendanceRecord;
    indexes: {
      'by-user': string;
      'by-date': string;
      'by-user-date': [string, string];
    };
  };
  settings: {
    key: string;
    value: {
      key: string;
      value: any;
      updatedAt: string;
    };
  };
}

class DatabaseService {
  private db: IDBPDatabase<AttendanceDB> | null = null;
  private readonly dbName = 'AttendanceManagementDB';
  private readonly version = 1;

  async init(): Promise<void> {
    try {
      this.db = await openDB<AttendanceDB>(this.dbName, this.version, {
        upgrade(db) {
          // Users store
          const userStore = db.createObjectStore('users', { keyPath: 'id' });
          userStore.createIndex('by-email', 'email', { unique: true });
          userStore.createIndex('by-role', 'role');

          // Attendance store
          const attendanceStore = db.createObjectStore('attendance', { keyPath: 'id' });
          attendanceStore.createIndex('by-user', 'userId');
          attendanceStore.createIndex('by-date', 'date');
          attendanceStore.createIndex('by-user-date', ['userId', 'date'], { unique: true });

          // Settings store
          db.createObjectStore('settings', { keyPath: 'key' });

          // Create default admin user
          const defaultAdmin: User = {
            id: 'admin-1',
            username: 'admin',
            email: 'admin@company.com',
            role: 'admin',
            firstName: 'Admin',
            lastName: 'User',
            isActive: true,
            createdAt: new Date().toISOString(),
          };

          const defaultEmployee: User = {
            id: 'emp-1',
            username: 'employee',
            email: 'employee@company.com',
            role: 'employee',
            firstName: 'John',
            lastName: 'Doe',
            department: 'IT',
            position: 'Software Developer',
            isActive: true,
            createdAt: new Date().toISOString(),
          };

          userStore.add(defaultAdmin);
          userStore.add(defaultEmployee);
        },
      });
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

  private ensureDB(): IDBPDatabase<AttendanceDB> {
    if (!this.db) {
      throw new Error('Database not initialized. Call init() first.');
    }
    return this.db;
  }

  // User operations
  async getUsers(): Promise<User[]> {
    const db = this.ensureDB();
    return await db.getAll('users');
  }

  async getUserById(id: string): Promise<User | undefined> {
    const db = this.ensureDB();
    return await db.get('users', id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const db = this.ensureDB();
    return await db.getFromIndex('users', 'by-email', email);
  }

  async addUser(user: User): Promise<void> {
    const db = this.ensureDB();
    await db.add('users', user);
  }

  async updateUser(user: User): Promise<void> {
    const db = this.ensureDB();
    await db.put('users', user);
  }

  async deleteUser(id: string): Promise<void> {
    const db = this.ensureDB();
    await db.delete('users', id);
  }

  async getUsersByRole(role: string): Promise<User[]> {
    const db = this.ensureDB();
    return await db.getAllFromIndex('users', 'by-role', role);
  }

  // Attendance operations
  async getAttendanceRecords(): Promise<AttendanceRecord[]> {
    const db = this.ensureDB();
    return await db.getAll('attendance');
  }

  async getAttendanceById(id: string): Promise<AttendanceRecord | undefined> {
    const db = this.ensureDB();
    return await db.get('attendance', id);
  }

  async getAttendanceByUser(userId: string): Promise<AttendanceRecord[]> {
    const db = this.ensureDB();
    return await db.getAllFromIndex('attendance', 'by-user', userId);
  }

  async getAttendanceByDate(date: string): Promise<AttendanceRecord[]> {
    const db = this.ensureDB();
    return await db.getAllFromIndex('attendance', 'by-date', date);
  }

  async getAttendanceByUserAndDate(userId: string, date: string): Promise<AttendanceRecord | undefined> {
    const db = this.ensureDB();
    return await db.getFromIndex('attendance', 'by-user-date', [userId, date]);
  }

  async addAttendanceRecord(record: AttendanceRecord): Promise<void> {
    const db = this.ensureDB();
    await db.add('attendance', record);
  }

  async updateAttendanceRecord(record: AttendanceRecord): Promise<void> {
    const db = this.ensureDB();
    await db.put('attendance', record);
  }

  async deleteAttendanceRecord(id: string): Promise<void> {
    const db = this.ensureDB();
    await db.delete('attendance', id);
  }

  async getAttendanceByDateRange(
    userId: string,
    startDate: string,
    endDate: string
  ): Promise<AttendanceRecord[]> {
    const records = await this.getAttendanceByUser(userId);
    return records.filter(record => 
      record.date >= startDate && record.date <= endDate
    );
  }

  // Settings operations
  async getSetting(key: string): Promise<any> {
    const db = this.ensureDB();
    const setting = await db.get('settings', key);
    return setting?.value;
  }

  async setSetting(key: string, value: any): Promise<void> {
    const db = this.ensureDB();
    await db.put('settings', {
      key,
      value,
      updatedAt: new Date().toISOString(),
    });
  }

  async deleteSetting(key: string): Promise<void> {
    const db = this.ensureDB();
    await db.delete('settings', key);
  }

  // Utility methods
  async clearAllData(): Promise<void> {
    const db = this.ensureDB();
    const tx = db.transaction(['users', 'attendance', 'settings'], 'readwrite');
    await Promise.all([
      tx.objectStore('users').clear(),
      tx.objectStore('attendance').clear(),
      tx.objectStore('settings').clear(),
    ]);
    await tx.done;
  }

  async exportData(): Promise<{
    users: User[];
    attendance: AttendanceRecord[];
    settings: any[];
  }> {
    const db = this.ensureDB();
    const [users, attendance, settings] = await Promise.all([
      db.getAll('users'),
      db.getAll('attendance'),
      db.getAll('settings'),
    ]);

    return { users, attendance, settings };
  }

  async importData(data: {
    users?: User[];
    attendance?: AttendanceRecord[];
    settings?: any[];
  }): Promise<void> {
    const db = this.ensureDB();
    const tx = db.transaction(['users', 'attendance', 'settings'], 'readwrite');

    if (data.users) {
      for (const user of data.users) {
        await tx.objectStore('users').put(user);
      }
    }

    if (data.attendance) {
      for (const record of data.attendance) {
        await tx.objectStore('attendance').put(record);
      }
    }

    if (data.settings) {
      for (const setting of data.settings) {
        await tx.objectStore('settings').put(setting);
      }
    }

    await tx.done;
  }
}

export const dbService = new DatabaseService();