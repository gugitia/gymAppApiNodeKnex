// Importa a conexão com o banco de dados
const connection = require("../database/connection");

// Função para criar um novo treino
exports.createUserTrain = async (req, res) => {
  try {
    const { user_id, name } = req.body;

    // Insere um novo treino no banco de dados
    const [newTrainId] = await connection("UserTrains")
      .insert({ user_id, name })
      .returning("train_id");

    res.status(201).json({
      train_id: newTrainId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating UserTrain",
      error: error.message,
    });
  }
};

// Função para obter todos os treinos
exports.getUserTrains = async (req, res) => {
  try {
    const userTrains = await connection("UserTrains").select("*");

    res.status(200).json({
      userTrains,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching UserTrains",
      error: error.message,
    });
  }
};

// Função para obter um treino específico por ID
exports.getUserTrainById = async (req, res) => {
  try {
    const { id } = req.params;

    const userTrain = await connection("UserTrains")
      .where({ train_id: id })
      .first();

    if (!userTrain) {
      return res.status(404).json({
        message: "UserTrain not found",
      });
    }

    res.status(200).json({
      userTrain,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching UserTrain",
      error: error.message,
    });
  }
};

// Função para atualizar um treino por ID
exports.updateUserTrain = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Atualiza o treino no banco
    const updatedRows = await connection("UserTrains")
      .where({ train_id: id })
      .update({ name });

    if (!updatedRows) {
      return res.status(404).json({
        message: "UserTrain not found",
      });
    }

    res.status(200).json({
      message: "UserTrain updated successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating UserTrain",
      error: error.message,
    });
  }
};

// Função para deletar um treino por ID
exports.deleteUserTrain = async (req, res) => {
  try {
    const { id } = req.params;

    // Deleta o treino do banco
    const deletedRows = await connection("UserTrains")
      .where({ train_id: id })
      .del();

    if (!deletedRows) {
      return res.status(404).json({
        message: "UserTrain not found",
      });
    }

    res.status(200).json({
      message: "UserTrain deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting UserTrain",
      error: error.message,
    });
  }
};
