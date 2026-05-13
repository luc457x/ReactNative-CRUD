import * as SQLite from 'expo-sqlite';

let db = null;

export const initDatabase = async () => {
  try {
    if (!db) {
      db = await SQLite.openDatabaseAsync('inventory.db');
    }

    // PRAGMA journal_mode = WAL; is often not supported on web and can cause issues with SharedArrayBuffer.
    // Removing it for now to improve web compatibility.
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        permission TEXT NOT NULL DEFAULT 'user'
      );
      
      CREATE TABLE IF NOT EXISTS Products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT,
        quantity INTEGER NOT NULL DEFAULT 0,
        unitPrice REAL NOT NULL DEFAULT 0.0,
        expirationDate TEXT
      );
    `);

    // Seed the admin user if the table is empty
    const result = await db.getAllAsync('SELECT count(*) as count FROM Users');
    const count = result[0].count;

    if (count === 0) {
      await db.runAsync(
        'INSERT INTO Users (name, password, permission) VALUES (?, ?, ?)',
        ['admin', 'admin', 'admin']
      );
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase first.');
  }
  return db;
};

export default db;
