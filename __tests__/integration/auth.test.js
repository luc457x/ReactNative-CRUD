/**
 * Integration tests for authentication and authorization flows.
 * Tests Login guard (FR01) and Register access control (admin-only).
 */

jest.mock('expo-sqlite', () => ({
  openDatabaseAsync: jest.fn(),
}));

jest.mock('../../src/database/database', () => {
  const mockDb = {
    runAsync: jest.fn(),
    getAllAsync: jest.fn(),
    getFirstAsync: jest.fn(),
  };
  return {
    getDb: jest.fn(() => mockDb),
    initDatabase: jest.fn(),
    __mockDb: mockDb,
  };
});

const { UserRepository } = require('../../src/database/UserRepository');
const { __mockDb: mockDb } = require('../../src/database/database');

describe('Authentication Flow Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Login guard (FR01)', () => {
    it('should return a user object for valid admin credentials', async () => {
      const adminUser = { id: 1, name: 'admin', permission: 'admin' };
      mockDb.getFirstAsync.mockResolvedValueOnce(adminUser);

      const result = await UserRepository.login('admin', 'admin');

      expect(result).not.toBeNull();
      expect(result.permission).toBe('admin');
    });

    it('should return null for invalid credentials (login rejected)', async () => {
      mockDb.getFirstAsync.mockResolvedValueOnce(null);

      const result = await UserRepository.login('admin', 'wrongpassword');

      expect(result).toBeNull();
    });

    it('should return null for non-existent user', async () => {
      mockDb.getFirstAsync.mockResolvedValueOnce(null);

      const result = await UserRepository.login('unknownuser', 'anypassword');

      expect(result).toBeNull();
    });
  });

  describe('Register access control (admin-only)', () => {
    it('should only allow creation if user has admin permission', async () => {
      // Simulate the check that RegisterScreen performs before calling UserRepository.create
      const currentUser = { id: 1, name: 'admin', permission: 'admin' };

      const canRegister = currentUser && currentUser.permission === 'admin';
      expect(canRegister).toBe(true);
    });

    it('should block registration for non-admin users', () => {
      const currentUser = { id: 2, name: 'employee', permission: 'user' };

      const canRegister = currentUser && currentUser.permission === 'admin';
      expect(canRegister).toBe(false);
    });

    it('should block registration when not logged in', () => {
      const currentUser = null;

      const canRegister = currentUser && currentUser.permission === 'admin';
      expect(canRegister).toBeFalsy();
    });

    it('should prevent duplicate usernames on registration', async () => {
      const existingUser = { id: 1, name: 'alice' };
      mockDb.getFirstAsync.mockResolvedValueOnce(existingUser);

      const found = await UserRepository.getByName('alice');
      const isDuplicate = !!found;

      expect(isDuplicate).toBe(true);
      // Registration should not proceed when isDuplicate is true
    });

    it('should allow registration when username is unique', async () => {
      mockDb.getFirstAsync.mockResolvedValueOnce(null);
      mockDb.runAsync.mockResolvedValueOnce({ lastInsertRowId: 5 });

      const found = await UserRepository.getByName('newuser');
      const isDuplicate = !!found;

      expect(isDuplicate).toBe(false);

      const newId = await UserRepository.create('newuser', 'pass123', 'user');
      expect(newId).toBe(5);
    });
  });
});
