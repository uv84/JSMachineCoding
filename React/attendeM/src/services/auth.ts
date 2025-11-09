import { dbService } from './database';
import type { User } from '../store/slices/authSlice';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

class AuthService {
  private readonly DEMO_PASSWORD = 'password123'; // In real app, use proper password hashing

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const user = await dbService.getUserByEmail(credentials.email);
      
      if (!user) {
        return {
          success: false,
          error: 'User not found',
        };
      }

      if (!user.isActive) {
        return {
          success: false,
          error: 'Account is inactive',
        };
      }

      // In a real app, you would verify the password hash
      // For demo purposes, we're using a simple password check
      if (credentials.password !== this.DEMO_PASSWORD) {
        return {
          success: false,
          error: 'Invalid password',
        };
      }

      // Set login session
      await this.setSession(user);

      return {
        success: true,
        user,
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Login failed',
      };
    }
  }

  async logout(): Promise<void> {
    try {
      await this.clearSession();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const userId = await dbService.getSetting('currentUserId');
      if (!userId) {
        return null;
      }

      const user = await dbService.getUserById(userId);
      return user || null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user !== null && user.isActive;
  }

  async hasRole(role: string): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user?.role === role;
  }

  async hasAnyRole(roles: string[]): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }

  private async setSession(user: User): Promise<void> {
    await dbService.setSetting('currentUserId', user.id);
    await dbService.setSetting('lastLoginAt', new Date().toISOString());
  }

  private async clearSession(): Promise<void> {
    await dbService.deleteSetting('currentUserId');
    await dbService.deleteSetting('lastLoginAt');
  }

  // Register new user (admin only)
  async register(userData: Omit<User, 'id' | 'createdAt'>): Promise<AuthResponse> {
    try {
      // Check if user already exists
      const existingUser = await dbService.getUserByEmail(userData.email);
      if (existingUser) {
        return {
          success: false,
          error: 'User already exists',
        };
      }

      const newUser: User = {
        ...userData,
        id: this.generateUserId(),
        createdAt: new Date().toISOString(),
      };

      await dbService.addUser(newUser);

      return {
        success: true,
        user: newUser,
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: 'Registration failed',
      };
    }
  }

  private generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Password reset (demo implementation)
  async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const user = await dbService.getUserByEmail(email);
      if (!user) {
        return {
          success: false,
          error: 'User not found',
        };
      }

      // In a real app, you would send an email with reset link
      console.log(`Password reset link sent to ${email}`);
      
      return {
        success: true,
      };
    } catch (error) {
      console.error('Password reset error:', error);
      return {
        success: false,
        error: 'Password reset failed',
      };
    }
  }
}

export const authService = new AuthService();