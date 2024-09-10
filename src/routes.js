const express = require("express");
const router = express.Router();

const userRoutes = require("./routes/userRoutes");
const trainRoutes = require("./routes/trainRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const trainExercisesRoutes = require("./routes/trainExercisesRoutes");

router.use("/usuario", userRoutes);
router.use("/treinos", trainRoutes);
router.use("/exercisios", exerciseRoutes);
router.use("/treino-exercisio", trainExercisesRoutes);

module.exports = router;
