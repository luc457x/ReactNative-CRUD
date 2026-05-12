import db from './database';

export const UserRepository = {
  // Creates a new user
  create: async (name, password, permission = 'user') => {
    try {
      const result = await db.runAsync(
        'INSERT INTO Users (name, password, permission) VALUES (?, ?, ?)',
        [name, password, permission]
      );
      return result.lastInsertRowId;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Returns all users
  getAll: async () => {
    try {
      return await db.getAllAsync('SELECT * FROM Users');
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Returns a user by ID
  getById: async (id) => {
    try {
      return await db.getFirstAsync('SELECT * FROM Users WHERE id = ?', [id]);
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  },
  
  // Finds a user by name (useful for login/verification)
  getByName: async (name) => {
      try {
          return await db.getFirstAsync('SELECT * FROM Users WHERE name = ?', [name]);
      } catch (error) {
          console.error('Error fetching user by name:', error);
          throw error;
      }
  },

  // Authenticates a user
  login: async (name, password) => {
      try {
          return await db.getFirstAsync('SELECT * FROM Users WHERE name = ? AND password = ?', [name, password]);
      } catch (error) {
          console.error('Error authenticating user:', error);
          throw error;
      }
  },

  // Updates an existing user
  update: async (id, name, password, permission) => {
    try {
      await db.runAsync(
        'UPDATE Users SET name = ?, password = ?, permission = ? WHERE id = ?',
        [name, password, permission, id]
      );
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Deletes a user
  delete: async (id) => {
    try {
      await db.runAsync('DELETE FROM Users WHERE id = ?', [id]);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
};
