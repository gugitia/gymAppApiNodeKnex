// Importa a conexão com o banco de dados
const connection = require("../database/connection");

// Função para associar um exercício a um treino
exports.addExerciseToTrain = async (req, res) => {
  try {
    const { train_id, exercise_id } = req.body;

    // Insere a relação entre treino e exercício no banco de dados
    const [newId] = await connection("ExersiceTrain")
      .insert({ train_id, exercise_id })
      .returning("id");

    res.status(201).json({
      message: "Exercise added to train successfully!",
      id: newId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding exercise to train",
      error: error.message,
    });
  }
};

// Função para obter todos os exercícios de um treino
exports.getExercisesByTrain = async (req, res) => {
  try {
    const { train_id } = req.params;

    const exercises = await connection("ExersiceTrain")
      .join("Exercise", "ExersiceTrain.exercise_id", "Exercise.exercise_id")
      .select("Exercise.exercise_id", "Exercise.name", "Exercise.description")
      .where("ExersiceTrain.train_id", train_id);

    res.status(200).json({
      message: "Exercises retrieved successfully!",
      exercises,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching exercises for train",
      error: error.message,
    });
  }
};

// Função para atualizar a relação entre exercício e treino
exports.updateExerciseInTrain = async (req, res) => {
  try {
    const { id } = req.params;
    const { train_id, exercise_id } = req.body;

    // Atualiza a relação no banco
    const updatedRows = await connection("ExersiceTrain")
      .where({ id })
      .update({ train_id, exercise_id });

    if (!updatedRows) {
      return res.status(404).json({
        message: "Exercise-Train relation not found",
      });
    }

    res.status(200).json({
      message: "Exercise-Train relation updated successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating exercise-train relation",
      error: error.message,
    });
  }
};

// Função para remover um exercício de um treino
exports.deleteExerciseFromTrain = async (req, res) => {
  try {
    const { id } = req.params;

    // Deleta a relação do banco
    const deletedRows = await connection("ExersiceTrain").where({ id }).del();

    if (!deletedRows) {
      return res.status(404).json({
        message: "Exercise-Train relation not found",
      });
    }

    res.status(200).json({
      message: "Exercise removed from train successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting exercise from train",
      error: error.message,
    });
  }
};
