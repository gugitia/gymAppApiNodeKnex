const express = require("express");
const router = express.Router();
const trainController = require("../controller/trainController");

router.get("/", trainController.getUserTrains);
router.get("/:id", trainController.getUserTrainById);
router.post("/", trainController.createUserTrain);
router.put("/:id", trainController.updateUserTrain);
router.delete("/:id", trainController.deleteUserTrain);

module.exports = router;
