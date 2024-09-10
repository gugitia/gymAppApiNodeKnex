const connection = require("../database/connection");

exports.createExercise = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Insere um novo exercício no banco
    const [newExerciseId] = await connection("Exercise")
      .insert({ name, description })
      .returning("exercise_id");

    res.status(201).json({
      exercise_id: newExerciseId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating exercise",
      error: error.message,
    });
  }
};

// Função para obter todos os exercícios
exports.getExercises = async (req, res) => {
  try {
    const exercises = await connection("Exercise").select("*");

    res.status(200).json({
      exercises,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching exercises",
      error: error.message,
    });
  }
};

// Função para obter um exercício específico por ID
exports.getExerciseById = async (req, res) => {
  try {
    const { id } = req.params;

    const exercise = await connection("Exercise")
      .where({ exercise_id: id })
      .first();

    if (!exercise) {
      return res.status(404).json({
        message: "Exercise not found",
      });
    }

    res.status(200).json({
      message: "Exercise retrieved successfully!",
      exercise,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching exercise",
      error: error.message,
    });
  }
};

// Função para atualizar um exercício por ID
exports.updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Atualiza o exercício no banco
    const updatedRows = await connection("Exercise")
      .where({ exercise_id: id })
      .update({ name, description });

    if (!updatedRows) {
      return res.status(404).json({
        message: "Exercise not found",
      });
    }

    res.status(200).json({
      message: "Exercise updated successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating exercise",
      error: error.message,
    });
  }
};

// Função para deletar um exercício por ID
exports.deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;

    // Deleta o exercício do banco
    const deletedRows = await connection("Exercise")
      .where({ exercise_id: id })
      .del();

    if (!deletedRows) {
      return res.status(404).json({
        message: "Exercise not found",
      });
    }

    res.status(200).json({
      message: "Exercise deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting exercise",
      error: error.message,
    });
  }
};
