import { attendanceService } from '../services/attendance';
import { dbService } from '../services/database';

describe('Attendance Service', () => {
  const testUserId = 'test-user-123';

  beforeEach(async () => {
    await dbService.init();
    // Add a test user
    await dbService.addUser({
      id: testUserId,
      username: 'testuser',
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'User',
      role: 'employee',
      isActive: true,
      createdAt: new Date().toISOString(),
    });
  });

  it('should check in successfully', async () => {
    const record = await attendanceService.checkIn(testUserId, 'Test check-in');

    expect(record).toBeDefined();
    expect(record.userId).toBe(testUserId);
    expect(record.checkIn).toBeDefined();
    expect(['present', 'late']).toContain(record.status);
    expect(record.notes).toBe('Test check-in');
  });

  it('should check out successfully', async () => {
    // First check in
    await attendanceService.checkIn(testUserId);

    // Then check out
    const record = await attendanceService.checkOut(testUserId, 'Test check-out');

    expect(record).toBeDefined();
    expect(record.checkIn).toBeDefined();
    expect(record.checkOut).toBeDefined();
    expect(record.totalHours).toBeGreaterThan(0);
    expect(record.notes).toBe('Test check-out');
  });

  it('should fail check out without check in', async () => {
    await expect(
      attendanceService.checkOut(testUserId)
    ).rejects.toThrow('No check-in record found for today');
  });

  it('should start break successfully', async () => {
    // First check in
    await attendanceService.checkIn(testUserId);

    // Start break
    const record = await attendanceService.startBreak(testUserId);

    expect(record.breakStart).toBeDefined();
    expect(record.checkIn).toBeDefined();
  });

  it('should fail start break without check in', async () => {
    await expect(
      attendanceService.startBreak(testUserId)
    ).rejects.toThrow('Please check in first');
  });

  it('should end break successfully', async () => {
    // Check in and start break
    await attendanceService.checkIn(testUserId);
    await attendanceService.startBreak(testUserId);

    // End break
    const record = await attendanceService.endBreak(testUserId);

    expect(record.breakStart).toBeDefined();
    expect(record.breakEnd).toBeDefined();
  });

  it('should fail end break without starting break', async () => {
    // Only check in, no break started
    await attendanceService.checkIn(testUserId);

    await expect(
      attendanceService.endBreak(testUserId)
    ).rejects.toThrow('No active break found');
  });

  it('should get today attendance', async () => {
    await attendanceService.checkIn(testUserId);

    const todayRecord = await attendanceService.getTodayAttendance(testUserId);

    expect(todayRecord).toBeDefined();
    expect(todayRecord?.userId).toBe(testUserId);
    expect(todayRecord?.date).toBe(new Date().toISOString().split('T')[0]);
  });

  it('should mark absent', async () => {
    const today = new Date().toISOString().split('T')[0];
    const record = await attendanceService.markAbsent(testUserId, today, 'Sick leave');

    expect(record.status).toBe('absent');
    expect(record.notes).toBe('Sick leave');
    expect(record.userId).toBe(testUserId);
    expect(record.date).toBe(today);
  });

  it('should get attendance stats', async () => {
    // Create some test records
    await attendanceService.checkIn(testUserId);
    await attendanceService.checkOut(testUserId);

    const stats = await attendanceService.getAttendanceStats(testUserId);

    expect(stats).toBeDefined();
    expect(stats.totalPresent).toBeGreaterThanOrEqual(0);
    expect(stats.totalAbsent).toBeGreaterThanOrEqual(0);
    expect(stats.currentMonth).toBeDefined();
    expect(typeof stats.averageHours).toBe('number');
  });

  it('should determine status correctly', async () => {
    // We'll test the status determination indirectly through check-in
    // Since the method is private, we check the result status
    
    // This test would need to be adjusted based on the actual implementation
    // For now, we just verify that status is set correctly
    const record = await attendanceService.checkIn(testUserId);
    expect(['present', 'late']).toContain(record.status);
  });
});
