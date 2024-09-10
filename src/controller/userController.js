const connection = require("../database/connection");

// Cria um novo usuário
async function createUser(req, res) {
  const { name } = req.body;
  const { cpf } = req.body;

  try {
    const [user_id] = await connection("User").insert({ name, cpf });
    console.log(name, cpf);
    return res.status(201).json({ user_id, name, cpf });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar o usuário" });
  }
}

// Retorna todos os usuários
async function getUsers(req, res) {
  try {
    const users = await connection("User").select("*");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar usuários" });
  }
}

// Retorna um usuário por ID
async function getUserById(req, res) {
  const { id } = req.params;

  try {
    const user = await connection("User").where({ user_id: id }).first();
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar o usuário" });
  }
}

// Atualiza um usuário por ID
async function updateUser(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const { cpf } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Nome é obrigatório" });
  }

  try {
    const updated = await connection("User")
      .where({ user_id: id })
      .update({ name, cpf });
    if (!updated) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    return res.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar o usuário" });
  }
}

// Deleta um usuário por ID
async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    const deleted = await connection("User").where({ user_id: id }).del();
    if (!deleted) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    return res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar o usuário" });
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
