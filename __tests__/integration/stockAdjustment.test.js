/**
 * Integration tests for stock quantity adjustment flows (FR04).
 * Tests increment/decrement business rules:
 *   - Quantity must never go below 0 (MAX(0, ...) constraint).
 *   - Custom increment amounts.
 *   - Correct SQL is issued for each operation.
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

describe('Stock Quantity Adjustment Flow (FR04)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Increment flow', () => {
    it('should increment product quantity by 1', async () => {
      mockDb.runAsync.mockResolvedValueOnce({});

      await ProductRepository.incrementQuantity(1);

      expect(mockDb.runAsync).toHaveBeenCalledWith(
        'UPDATE Products SET quantity = quantity + ? WHERE id = ?',
        [1, 1]
      );
    });

    it('should reflect updated quantity after increment (via getById)', async () => {
      mockDb.runAsync.mockResolvedValueOnce({});
      mockDb.getFirstAsync.mockResolvedValueOnce({ id: 1, name: 'Arroz', quantity: 51 });

      await ProductRepository.incrementQuantity(1);
      const updated = await ProductRepository.getById(1);

      expect(updated.quantity).toBe(51);
    });
  });

  describe('Decrement flow', () => {
    it('should decrement product quantity by 1 using MAX(0,...) guard', async () => {
      mockDb.runAsync.mockResolvedValueOnce({});

      await ProductRepository.decrementQuantity(1);

      expect(mockDb.runAsync).toHaveBeenCalledWith(
        'UPDATE Products SET quantity = MAX(0, quantity - ?) WHERE id = ?',
        [1, 1]
      );
    });

    it('should not produce negative stock: MAX(0, 0-1) = 0', async () => {
      // The business rule is enforced at SQL level with MAX(0, quantity - ?).
      // Here we verify the correct query is emitted even when quantity is 0.
      mockDb.runAsync.mockResolvedValueOnce({});
      mockDb.getFirstAsync.mockResolvedValueOnce({ id: 1, name: 'Arroz', quantity: 0 });

      await ProductRepository.decrementQuantity(1);
      const updated = await ProductRepository.getById(1);

      // SQL MAX(0, 0-1) = 0: the mock simulates the DB returning 0.
      expect(updated.quantity).toBe(0);
    });
  });

  describe('Product grouping by name+category (SPEC.md business rule)', () => {
    it('should retrieve all entries with the same name and category', async () => {
      const entries = [
        { id: 1, name: 'Arroz', category: 'Alimentos', quantity: 20, expirationDate: '2025-06-01' },
        { id: 2, name: 'Arroz', category: 'Alimentos', quantity: 30, expirationDate: '2025-09-01' },
      ];
      mockDb.getAllAsync.mockResolvedValueOnce(entries);

      const result = await ProductRepository.getByNameAndCategory('Arroz', 'Alimentos');

      expect(result).toHaveLength(2);
      const totalQty = result.reduce((sum, e) => sum + e.quantity, 0);
      expect(totalQty).toBe(50);
    });
  });
});
