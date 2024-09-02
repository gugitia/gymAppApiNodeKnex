const express = require("express");
const router = express.Router();
const materiaisTemplateController = require("../controller/materialTemplateController");

router.get("/", materiaisTemplateController.listarMaterialTemplates);
router.get("/:id", materiaisTemplateController.buscarMaterialTemplatePorId);
router.get("/lista/:id", materiaisTemplateController.listarMateriaisPorServico);
router.post("/", materiaisTemplateController.criarMaterialTemplate);
router.put("/:id", materiaisTemplateController.atualizarMaterialTemplate);
router.delete("/:id", materiaisTemplateController.removerMaterialTemplate);

module.exports = router;
