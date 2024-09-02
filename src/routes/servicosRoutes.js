const express = require("express");
const router = express.Router();
const servicosController = require("../controller/servicosController");

router.get("/", servicosController.listarServicos);
router.get("/:id", servicosController.buscarServicoPorId);
router.get(
  "/concessionaria/:id",
  servicosController.listarServicosPorConcessionaria
);
router.post("/", servicosController.criarServico);
router.put("/:id", servicosController.atualizarServico);
router.delete("/:id", servicosController.removerServico);

module.exports = router;
