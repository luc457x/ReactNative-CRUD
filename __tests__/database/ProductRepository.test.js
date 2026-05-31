/**
 * Unit tests for ProductRepository
 * Tests CRUD operations, increment/decrement constraints, and expiration grouping.
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

const { ProductRepository } = require('../../src/database/ProductRepository');
const { __mockDb: mockDb } = require('../../src/database/database');

describe('ProductRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should insert a product and return lastInsertRowId', async () => {
      mockDb.runAsync.mockResolvedValueOnce({ lastInsertRowId: 10 });

      const id = await ProductRepository.create('Arroz', 'Alimentos', 50, 4.99, '2025-12-31');

      expect(mockDb.runAsync).toHaveBeenCalledWith(
        'INSERT INTO Products (name, category, quantity, unitPrice, expirationDate) VALUES (?, ?, ?, ?, ?)',
        ['Arroz', 'Alimentos', 50, 4.99, '2025-12-31']
      );
      expect(id).toBe(10);
    });

    it('should allow same product name with different expiration dates (business rule)', async () => {
      mockDb.runAsync
        .mockResolvedValueOnce({ lastInsertRowId: 1 })
        .mockResolvedValueOnce({ lastInsertRowId: 2 });

      const id1 = await ProductRepository.create('Feijão', 'Alimentos', 20, 3.50, '2025-06-01');
      const id2 = await ProductRepository.create('Feijão', 'Alimentos', 30, 3.50, '2025-09-01');

      expect(id1).toBe(1);
      expect(id2).toBe(2);
      expect(mockDb.runAsync).toHaveBeenCalledTimes(2);
    });

    it('should throw and log error on db failure', async () => {
      const err = new Error('Insert error');
      mockDb.runAsync.mockRejectedValueOnce(err);
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await expect(ProductRepository.create('X', 'Y', 0, 0, null)).rejects.toThrow('Insert error');
      expect(consoleSpy).toHaveBeenCalledWith('Error creating product:', err);
      consoleSpy.mockRestore();
    });
  });

  describe('getAll', () => {
    it('should return all products', async () => {
      const products = [
        { id: 1, name: 'Arroz', quantity: 50 },
        { id: 2, name: 'Feijão', quantity: 30 },
      ];
      mockDb.getAllAsync.mockResolvedValueOnce(products);

      const result = await ProductRepository.getAll();

      expect(mockDb.getAllAsync).toHaveBeenCalledWith('SELECT * FROM Products');
      expect(result).toHaveLength(2);
    });
  });

  describe('getById', () => {
    it('should return a product by id', async () => {
      const product = { id: 1, name: 'Arroz' };
      mockDb.getFirstAsync.mockResolvedValueOnce(product);

      const result = await ProductRepository.getById(1);

      expect(mockDb.getFirstAsync).toHaveBeenCalledWith(
        'SELECT * FROM Products WHERE id = ?',
        [1]
      );
      expect(result).toEqual(product);
    });
  });

  describe('update', () => {
    it('should update a product with correct params', async () => {
      mockDb.runAsync.mockResolvedValueOnce({});

      await ProductRepository.update(1, 'Arroz Integral', 'Alimentos', 45, 5.99, '2026-01-01');

      expect(mockDb.runAsync).toHaveBeenCalledWith(
        'UPDATE Products SET name = ?, category = ?, quantity = ?, unitPrice = ?, expirationDate = ? WHERE id = ?',
        ['Arroz Integral', 'Alimentos', 45, 5.99, '2026-01-01', 1]
      );
    });
  });

  describe('delete', () => {
    it('should delete a product by id', async () => {
      mockDb.runAsync.mockResolvedValueOnce({});

      await ProductRepository.delete(3);

      expect(mockDb.runAsync).toHaveBeenCalledWith(
        'DELETE FROM Products WHERE id = ?',
        [3]
      );
    });
  });

  describe('incrementQuantity', () => {
    it('should increment quantity by 1 by default', async () => {
      mockDb.runAsync.mockResolvedValueOnce({});

      await ProductRepository.incrementQuantity(2);

      expect(mockDb.runAsync).toHaveBeenCalledWith(
        'UPDATE Products SET quantity = quantity + ? WHERE id = ?',
        [1, 2]
      );
    });

    it('should support custom increment amount', async () => {
      mockDb.runAsync.mockResolvedValueOnce({});

      await ProductRepository.incrementQuantity(2, 10);

      expect(mockDb.runAsync).toHaveBeenCalledWith(
        'UPDATE Products SET quantity = quantity + ? WHERE id = ?',
        [10, 2]
      );
    });
  });

  describe('decrementQuantity', () => {
    it('should decrement quantity using MAX(0, ...) to prevent negative stock', async () => {
      mockDb.runAsync.mockResolvedValueOnce({});

      await ProductRepository.decrementQuantity(2);

      expect(mockDb.runAsync).toHaveBeenCalledWith(
        'UPDATE Products SET quantity = MAX(0, quantity - ?) WHERE id = ?',
        [1, 2]
      );
    });
  });

  describe('getByNameAndCategory', () => {
    it('should return all entries matching name and category', async () => {
      const entries = [
        { id: 1, name: 'Arroz', category: 'Alimentos', expirationDate: '2025-06-01' },
        { id: 2, name: 'Arroz', category: 'Alimentos', expirationDate: '2025-09-01' },
      ];
      mockDb.getAllAsync.mockResolvedValueOnce(entries);

      const result = await ProductRepository.getByNameAndCategory('Arroz', 'Alimentos');

      expect(mockDb.getAllAsync).toHaveBeenCalledWith(
        'SELECT * FROM Products WHERE name = ? AND category = ?',
        ['Arroz', 'Alimentos']
      );
      expect(result).toHaveLength(2);
    });
  });
});
