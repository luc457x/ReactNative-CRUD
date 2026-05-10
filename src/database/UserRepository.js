import db from './database';

export const UserRepository = {
  // Cria um novo usuário
  create: async (nome, senha, permissao = 'user') => {
    try {
      const result = await db.runAsync(
        'INSERT INTO Usuarios (nome, senha, permissao) VALUES (?, ?, ?)',
        [nome, senha, permissao]
      );
      return result.lastInsertRowId;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  },

  // Retorna todos os usuários
  getAll: async () => {
    try {
      return await db.getAllAsync('SELECT * FROM Usuarios');
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  },

  // Retorna um usuário pelo ID
  getById: async (id) => {
    try {
      return await db.getFirstAsync('SELECT * FROM Usuarios WHERE id = ?', [id]);
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
      throw error;
    }
  },
  
  // Busca um usuário pelo nome (útil para login/verificação)
  getByNome: async (nome) => {
      try {
          return await db.getFirstAsync('SELECT * FROM Usuarios WHERE nome = ?', [nome]);
      } catch (error) {
          console.error('Erro ao buscar usuário por nome:', error);
          throw error;
      }
  },

  // Autentica um usuário
  login: async (nome, senha) => {
      try {
          return await db.getFirstAsync('SELECT * FROM Usuarios WHERE nome = ? AND senha = ?', [nome, senha]);
      } catch (error) {
          console.error('Erro ao autenticar usuário:', error);
          throw error;
      }
  },

  // Atualiza um usuário existente
  update: async (id, nome, senha, permissao) => {
    try {
      await db.runAsync(
        'UPDATE Usuarios SET nome = ?, senha = ?, permissao = ? WHERE id = ?',
        [nome, senha, permissao, id]
      );
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  },

  // Exclui um usuário
  delete: async (id) => {
    try {
      await db.runAsync('DELETE FROM Usuarios WHERE id = ?', [id]);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      throw error;
    }
  }
};
