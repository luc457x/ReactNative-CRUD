import * as SQLite from 'expo-sqlite';

// Open (or create) the local database.
// The inventory.db file will be in the app's private directory on the device.
const db = SQLite.openDatabaseSync('inventory.db');

export const initDatabase = async () => {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      
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
      console.log('Admin user seeded successfully!');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export default db;
