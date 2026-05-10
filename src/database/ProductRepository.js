import db from './database';

export const ProductRepository = {
  // Cria um novo produto
  create: async (nome, categoria, quantidade, precoUnitario, dataValidade) => {
    try {
      const result = await db.runAsync(
        'INSERT INTO Produtos (nome, categoria, quantidade, precoUnitario, dataValidade) VALUES (?, ?, ?, ?, ?)',
        [nome, categoria, quantidade, precoUnitario, dataValidade]
      );
      return result.lastInsertRowId;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
  },

  // Retorna todos os produtos
  getAll: async () => {
    try {
      return await db.getAllAsync('SELECT * FROM Produtos');
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  },

  // Retorna um produto pelo ID
  getById: async (id) => {
    try {
      return await db.getFirstAsync('SELECT * FROM Produtos WHERE id = ?', [id]);
    } catch (error) {
      console.error('Erro ao buscar produto por ID:', error);
      throw error;
    }
  },

  // Atualiza um produto existente
  update: async (id, nome, categoria, quantidade, precoUnitario, dataValidade) => {
    try {
      await db.runAsync(
        'UPDATE Produtos SET nome = ?, categoria = ?, quantidade = ?, precoUnitario = ?, dataValidade = ? WHERE id = ?',
        [nome, categoria, quantidade, precoUnitario, dataValidade, id]
      );
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    }
  },

  // Exclui um produto
  delete: async (id) => {
    try {
      await db.runAsync('DELETE FROM Produtos WHERE id = ?', [id]);
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      throw error;
    }
  },

  // Incrementa a quantidade de um produto
  incrementQuantity: async (id, amount = 1) => {
    try {
      await db.runAsync(
        'UPDATE Produtos SET quantidade = quantidade + ? WHERE id = ?',
        [amount, id]
      );
    } catch (error) {
      console.error('Erro ao incrementar quantidade do produto:', error);
      throw error;
    }
  },

  // Decrementa a quantidade de um produto
  decrementQuantity: async (id, amount = 1) => {
    try {
      // Impede que a quantidade fique negativa
      await db.runAsync(
        'UPDATE Produtos SET quantidade = MAX(0, quantidade - ?) WHERE id = ?',
        [amount, id]
      );
    } catch (error) {
      console.error('Erro ao decrementar quantidade do produto:', error);
      throw error;
    }
  }
};
