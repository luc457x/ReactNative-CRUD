/**
 * Unit tests for UserRepository
 * Tests CRUD operations and business constraints against a mock SQLite db.
 */

// Mock expo-sqlite before any imports
jest.mock('expo-sqlite', () => ({
  openDatabaseAsync: jest.fn(),
}));

// Mock the database module to control the db instance
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
const { getDb, __mockDb: mockDb } = require('../../src/database/database');

describe('UserRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should insert a new user and return the lastInsertRowId', async () => {
      mockDb.runAsync.mockResolvedValueOnce({ lastInsertRowId: 42 });

      const id = await UserRepository.create('alice', 'secret', 'user');

      expect(mockDb.runAsync).toHaveBeenCalledWith(
        'INSERT INTO Users (name, password, permission) VALUES (?, ?, ?)',
        ['alice', 'secret', 'user']
      );
      expect(id).toBe(42);
    });

    it('should throw and log error on db failure', async () => {
      const err = new Error('DB error');
      mockDb.runAsync.mockRejectedValueOnce(err);
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await expect(UserRepository.create('bob', 'pass', 'admin')).rejects.toThrow('DB error');
      expect(consoleSpy).toHaveBeenCalledWith('Error creating user:', err);
      consoleSpy.mockRestore();
    });
  });

  describe('login', () => {
    it('should return a user object when credentials are valid', async () => {
      const fakeUser = { id: 1, name: 'admin', permission: 'admin' };
      mockDb.getFirstAsync.mockResolvedValueOnce(fakeUser);

      const user = await UserRepository.login('admin', 'admin');

      expect(mockDb.getFirstAsync).toHaveBeenCalledWith(
        'SELECT * FROM Users WHERE name = ? AND password = ?',
        ['admin', 'admin']
      );
      expect(user).toEqual(fakeUser);
    });

    it('should return null when credentials are invalid', async () => {
      mockDb.getFirstAsync.mockResolvedValueOnce(null);

      const user = await UserRepository.login('admin', 'wrong');

      expect(user).toBeNull();
    });
  });

  describe('getByName', () => {
    it('should return a user by name', async () => {
      const fakeUser = { id: 1, name: 'admin' };
      mockDb.getFirstAsync.mockResolvedValueOnce(fakeUser);

      const user = await UserRepository.getByName('admin');

      expect(mockDb.getFirstAsync).toHaveBeenCalledWith(
        'SELECT * FROM Users WHERE name = ?',
        ['admin']
      );
      expect(user).toEqual(fakeUser);
    });
  });

  describe('getAll', () => {
    it('should return all users', async () => {
      const fakeUsers = [{ id: 1, name: 'admin' }, { id: 2, name: 'alice' }];
      mockDb.getAllAsync.mockResolvedValueOnce(fakeUsers);

      const users = await UserRepository.getAll();

      expect(mockDb.getAllAsync).toHaveBeenCalledWith('SELECT * FROM Users');
      expect(users).toHaveLength(2);
    });
  });

  describe('delete', () => {
    it('should call DELETE with the correct id', async () => {
      mockDb.runAsync.mockResolvedValueOnce({});

      await UserRepository.delete(5);

      expect(mockDb.runAsync).toHaveBeenCalledWith(
        'DELETE FROM Users WHERE id = ?',
        [5]
      );
    });
  });
});
