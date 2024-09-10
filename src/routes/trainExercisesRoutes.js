const express = require("express");
const router = express.Router();
const trainExerciseController = require("../controller/trainExerciseController");

router.get("/:train_id", trainExerciseController.getExercisesByTrain);
router.post("/", trainExerciseController.addExerciseToTrain);
router.put("/:id", trainExerciseController.updateExerciseInTrain);
router.delete("/:id", trainExerciseController.deleteExerciseFromTrain);

module.exports = router;
