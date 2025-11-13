import '@testing-library/jest-dom';
import { mockDatabaseService } from './mocks/database.mock';
import { mockAuthService, mockAttendanceService } from './mocks/services.mock';

// Mock the database service module
jest.mock('../services/database', () => ({
  dbService: mockDatabaseService,
}));

// Mock the auth service module
jest.mock('../services/auth', () => ({
  authService: mockAuthService,
}));

// Mock the attendance service module
jest.mock('../services/attendance', () => ({
  attendanceService: mockAttendanceService,
}));

// Reset all mocks before each test
beforeEach(() => {
  // Clear all mocks
  jest.clearAllMocks();
  
  // Reset mock services
  mockDatabaseService.reset();
  mockAuthService.reset();
  
  // Clear storage
  localStorage.clear();
  sessionStorage.clear();
});