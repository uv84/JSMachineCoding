import { dbService } from '../services/database';
import type { User } from '../store/slices/authSlice';

describe('Database Service', () => {
  beforeEach(async () => {
    await dbService.init();
  });

  it('should initialize database successfully', async () => {
    // Database should be initialized without errors
    const users = await dbService.getUsers();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0); // Should have default users
  });

  it('should add and retrieve user', async () => {
    const testUser: User = {
      id: 'test-123',
      username: 'testuser',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      role: 'employee',
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    await dbService.addUser(testUser);
    const retrievedUser = await dbService.getUserById('test-123');

    expect(retrievedUser).toBeDefined();
    expect(retrievedUser?.email).toBe('test@example.com');
    expect(retrievedUser?.role).toBe('employee');
  });

  it('should update user', async () => {
    const user = await dbService.getUserByEmail('admin@company.com');
    expect(user).toBeDefined();

    if (user) {
      const updatedUser = { ...user, firstName: 'Updated Admin' };
      await dbService.updateUser(updatedUser);

      const retrieved = await dbService.getUserById(user.id);
      expect(retrieved?.firstName).toBe('Updated Admin');
    }
  });

  it('should delete user', async () => {
    const testUser: User = {
      id: 'delete-test',
      username: 'deleteuser',
      email: 'delete@test.com',
      firstName: 'Delete',
      lastName: 'Test',
      role: 'employee',
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    await dbService.addUser(testUser);
    let user = await dbService.getUserById('delete-test');
    expect(user).toBeDefined();

    await dbService.deleteUser('delete-test');
    user = await dbService.getUserById('delete-test');
    expect(user).toBeUndefined();
  });

  it('should get user by email', async () => {
    const user = await dbService.getUserByEmail('admin@company.com');
    expect(user).toBeDefined();
    expect(user?.role).toBe('admin');
  });

  it('should get users by role', async () => {
    const adminUsers = await dbService.getUsersByRole('admin');
    const employeeUsers = await dbService.getUsersByRole('employee');

    expect(Array.isArray(adminUsers)).toBe(true);
    expect(Array.isArray(employeeUsers)).toBe(true);
    expect(adminUsers.length).toBeGreaterThan(0);
    
    // All returned users should have the correct role
    adminUsers.forEach(user => {
      expect(user.role).toBe('admin');
    });
  });

  it('should manage settings', async () => {
    const testKey = 'testSetting';
    const testValue = { theme: 'dark', language: 'en' };

    await dbService.setSetting(testKey, testValue);
    const retrieved = await dbService.getSetting(testKey);

    expect(retrieved).toEqual(testValue);

    await dbService.deleteSetting(testKey);
    const deleted = await dbService.getSetting(testKey);
    expect(deleted).toBeUndefined();
  });

  it('should export and import data', async () => {
    // Add test data
    const testUser: User = {
      id: 'export-test',
      username: 'exportuser',
      email: 'export@test.com',
      firstName: 'Export',
      lastName: 'Test',
      role: 'employee',
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    await dbService.addUser(testUser);
    await dbService.setSetting('exportTest', 'testValue');

    // Export data
    const exportedData = await dbService.exportData();
    expect(exportedData.users).toBeDefined();
    expect(exportedData.settings).toBeDefined();
    expect(exportedData.attendance).toBeDefined();

    // Clear data
    await dbService.clearAllData();
    let users = await dbService.getUsers();
    expect(users.length).toBe(0);

    // Import data
    await dbService.importData(exportedData);
    users = await dbService.getUsers();
    expect(users.length).toBeGreaterThan(0);

    const importedUser = await dbService.getUserById('export-test');
    expect(importedUser).toBeDefined();
    expect(importedUser?.email).toBe('export@test.com');

    const importedSetting = await dbService.getSetting('exportTest');
    expect(importedSetting).toBe('testValue');
  });

  it('should handle attendance records', async () => {
    const testAttendance = {
      id: 'att-test-123',
      userId: 'user-123',
      date: '2024-01-15',
      checkIn: '09:00',
      checkOut: '17:00',
      status: 'present' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      breakStart: null,
      breakEnd: null,
      totalHours: 8,
      notes: undefined,
    };

    await dbService.addAttendanceRecord(testAttendance);
    const retrieved = await dbService.getAttendanceById('att-test-123');

    expect(retrieved).toBeDefined();
    expect(retrieved?.userId).toBe('user-123');
    expect(retrieved?.status).toBe('present');
  });

  it('should get attendance by date range', async () => {
    const userId = 'range-test-user';
    const startDate = '2024-01-01';
    const endDate = '2024-01-31';

    // Add test attendance records
    const records = [
      {
        id: 'att-1',
        userId,
        date: '2024-01-10',
        checkIn: '09:00',
        checkOut: '17:00',
        status: 'present' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        breakStart: null,
        breakEnd: null,
        totalHours: 8,
        notes: undefined,
      },
      {
        id: 'att-2',
        userId,
        date: '2024-01-20',
        checkIn: '09:00',
        checkOut: '17:00',
        status: 'present' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        breakStart: null,
        breakEnd: null,
        totalHours: 8,
        notes: undefined,
      },
    ];

    for (const record of records) {
      await dbService.addAttendanceRecord(record);
    }

    const rangeRecords = await dbService.getAttendanceByDateRange(
      userId,
      startDate,
      endDate
    );

    expect(rangeRecords.length).toBe(2);
    expect(rangeRecords[0].date).toBe('2024-01-10');
    expect(rangeRecords[1].date).toBe('2024-01-20');
  });
});
