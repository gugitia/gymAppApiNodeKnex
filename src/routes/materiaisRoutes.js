const express = require("express");
const router = express.Router();
const materiaisController = require("../controller/materialController");

router.get("/", materiaisController.listarMateriais);
router.get("/:id", materiaisController.buscarMaterialPorId);
router.get(
  "/concessionaria/:id",
  materiaisController.listarMateriaisPorConcessionaria
);
router.post("/", materiaisController.criarMaterial);
router.put("/:id", materiaisController.atualizarMaterial);
router.delete("/:id", materiaisController.removerMaterial);

module.exports = router;
