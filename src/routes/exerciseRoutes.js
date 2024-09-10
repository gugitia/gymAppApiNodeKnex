const express = require("express");
const router = express.Router();
const exerciseController = require("../controller/exerciseController");

router.get("/", exerciseController.getExercises);
router.get("/:id", exerciseController.getExerciseById);
router.post("/", exerciseController.createExercise);
router.put("/:id", exerciseController.updateExercise);
router.delete("/:id", exerciseController.deleteExercise);

module.exports = router;
