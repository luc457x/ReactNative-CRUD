import { getDb } from './database';

export const ProductRepository = {
  // Creates a new product
  create: async (name, category, quantity, unitPrice, expirationDate) => {
    try {
      const db = getDb();
      const result = await db.runAsync(
        'INSERT INTO Products (name, category, quantity, unitPrice, expirationDate) VALUES (?, ?, ?, ?, ?)',
        [name, category, quantity, unitPrice, expirationDate]
      );
      return result.lastInsertRowId;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Returns all products
  getAll: async () => {
    try {
      const db = getDb();
      return await db.getAllAsync('SELECT * FROM Products');
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Returns a product by ID
  getById: async (id) => {
    try {
      const db = getDb();
      return await db.getFirstAsync('SELECT * FROM Products WHERE id = ?', [id]);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
  },

  // Updates an existing product
  update: async (id, name, category, quantity, unitPrice, expirationDate) => {
    try {
      const db = getDb();
      await db.runAsync(
        'UPDATE Products SET name = ?, category = ?, quantity = ?, unitPrice = ?, expirationDate = ? WHERE id = ?',
        [name, category, quantity, unitPrice, expirationDate, id]
      );
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Deletes a product
  delete: async (id) => {
    try {
      const db = getDb();
      await db.runAsync('DELETE FROM Products WHERE id = ?', [id]);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Increments the quantity of a product
  incrementQuantity: async (id, amount = 1) => {
    try {
      const db = getDb();
      await db.runAsync(
        'UPDATE Products SET quantity = quantity + ? WHERE id = ?',
        [amount, id]
      );
    } catch (error) {
      console.error('Error incrementing product quantity:', error);
      throw error;
    }
  },

  // Decrements the quantity of a product
  decrementQuantity: async (id, amount = 1) => {
    try {
      const db = getDb();
      // Prevents quantity from becoming negative
      await db.runAsync(
        'UPDATE Products SET quantity = MAX(0, quantity - ?) WHERE id = ?',
        [amount, id]
      );
    } catch (error) {
      console.error('Error decrementing product quantity:', error);
      throw error;
    }
  }
};
