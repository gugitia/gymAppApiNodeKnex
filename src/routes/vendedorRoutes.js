const express = require("express");
const router = express.Router();
const vendedorController = require("../controller/vendedorController");

router.get("/", vendedorController.listarVendedores);
router.get("/:id", vendedorController.buscarVendedorPorId);
router.post("/", vendedorController.criarVendedor);
router.put("/:id", vendedorController.atualizarVendedor);
router.delete("/:id", vendedorController.removerVendedor);

module.exports = router;
