import * as SQLite from 'expo-sqlite';

// Abre (ou cria) o banco de dados local.
// O arquivo estoque.db ficará no diretório privado do app no dispositivo.
const db = SQLite.openDatabaseSync('estoque.db');

export const initDatabase = async () => {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      
      CREATE TABLE IF NOT EXISTS Usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        senha TEXT NOT NULL,
        permissao TEXT NOT NULL DEFAULT 'user'
      );
      
      CREATE TABLE IF NOT EXISTS Produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        categoria TEXT,
        quantidade INTEGER NOT NULL DEFAULT 0,
        precoUnitario REAL NOT NULL DEFAULT 0.0,
        dataValidade TEXT
      );
    `);

    // Semeia o usuário admin se a tabela estiver vazia
    const result = await db.getAllAsync('SELECT count(*) as count FROM Usuarios');
    const count = result[0].count;

    if (count === 0) {
      await db.runAsync(
        'INSERT INTO Usuarios (nome, senha, permissao) VALUES (?, ?, ?)',
        ['admin', 'admin', 'admin']
      );
      console.log('Usuário admin semeado com sucesso!');
    }
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
  }
};

export default db;
