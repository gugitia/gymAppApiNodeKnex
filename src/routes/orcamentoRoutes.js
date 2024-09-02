const express = require("express");
const router = express.Router();
const orcamentoController = require("../controller/orcamentoController");

router.get("/", orcamentoController.listarOrcamentos);
router.get("/:id", orcamentoController.buscarOrcamentoPorId);
router.post("/", orcamentoController.criarOrcamento);
router.put("/:id", orcamentoController.atualizarOrcamento);
router.delete("/:id", orcamentoController.removerOrcamento);

module.exports = router;
