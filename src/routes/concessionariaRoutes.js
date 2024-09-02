const express = require("express");
const router = express.Router();
const concessionariaController = require("../controller/concessionariaController");

router.get("/", concessionariaController.listarConcessionarias);
router.get("/:id", concessionariaController.buscarConcessionariaPorId);
router.post("/", concessionariaController.criarConcessionaria);
router.put("/:id", concessionariaController.atualizarConcessionaria);
router.delete("/:id", concessionariaController.removerConcessionaria);

module.exports = router;
