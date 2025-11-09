import { authService } from '../services/auth';
import { dbService } from '../services/database';

describe('Authentication Service', () => {
  beforeEach(async () => {
    // Initialize database for each test
    await dbService.init();
  });

  it('should login with valid credentials', async () => {
    const result = await authService.login({
      email: 'admin@company.com',
      password: 'password123',
    });

    expect(result.success).toBe(true);
    expect(result.user).toBeDefined();
    expect(result.user?.email).toBe('admin@company.com');
    expect(result.user?.role).toBe('admin');
  });

  it('should fail login with invalid credentials', async () => {
    const result = await authService.login({
      email: 'admin@company.com',
      password: 'wrongpassword',
    });

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.user).toBeUndefined();
  });

  it('should fail login with non-existent user', async () => {
    const result = await authService.login({
      email: 'nonexistent@company.com',
      password: 'password123',
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe('User not found');
  });

  it('should register new user', async () => {
    const newUser = {
      username: 'testuser',
      email: 'test@company.com',
      firstName: 'Test',
      lastName: 'User',
      role: 'employee' as const,
      isActive: true,
    };

    const result = await authService.register(newUser);

    expect(result.success).toBe(true);
    expect(result.user).toBeDefined();
    expect(result.user?.email).toBe('test@company.com');
  });

  it('should fail to register user with existing email', async () => {
    const duplicateUser = {
      username: 'duplicate',
      email: 'admin@company.com', // Already exists
      firstName: 'Duplicate',
      lastName: 'User',
      role: 'employee' as const,
      isActive: true,
    };

    const result = await authService.register(duplicateUser);

    expect(result.success).toBe(false);
    expect(result.error).toBe('User already exists');
  });

  it('should get current user after login', async () => {
    await authService.login({
      email: 'admin@company.com',
      password: 'password123',
    });

    const currentUser = await authService.getCurrentUser();

    expect(currentUser).toBeDefined();
    expect(currentUser?.email).toBe('admin@company.com');
  });

  it('should check authentication status', async () => {
    // Initially not authenticated
    let isAuth = await authService.isAuthenticated();
    expect(isAuth).toBe(false);

    // Login
    await authService.login({
      email: 'admin@company.com',
      password: 'password123',
    });

    // Should be authenticated
    isAuth = await authService.isAuthenticated();
    expect(isAuth).toBe(true);

    // Logout
    await authService.logout();

    // Should not be authenticated
    isAuth = await authService.isAuthenticated();
    expect(isAuth).toBe(false);
  });

  it('should check user roles', async () => {
    await authService.login({
      email: 'admin@company.com',
      password: 'password123',
    });

    const hasAdminRole = await authService.hasRole('admin');
    const hasEmployeeRole = await authService.hasRole('employee');
    const hasAnyRole = await authService.hasAnyRole(['admin', 'hr']);

    expect(hasAdminRole).toBe(true);
    expect(hasEmployeeRole).toBe(false);
    expect(hasAnyRole).toBe(true);
  });
});
