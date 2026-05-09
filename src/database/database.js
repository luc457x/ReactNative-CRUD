import * as SQLite from 'expo-sqlite';

// Abre (ou cria) o banco de dados local.
// O arquivo estoque.db ficará no diretório privado do app no dispositivo.
const db = SQLite.openDatabaseSync('estoque.db');

export default db;
