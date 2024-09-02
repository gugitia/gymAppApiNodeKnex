const express = require("express");
const router = express.Router();

const concessionariaRoutes = require("./routes/concessionariaRoutes");
const materiaisRoutes = require("./routes/materiaisRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const vendedorRoutes = require("./routes/vendedorRoutes.js");
const servicoRoutes = require("./routes/servicosRoutes");
const materialTemplateRoutes = require("./routes/materiaisServicosRoutes.js");
const orcamentoRoutes = require("./routes/orcamentoRoutes.js");

router.use("/concessionarias", concessionariaRoutes);
router.use("/materiais", materiaisRoutes);
router.use("/clientes", clienteRoutes);
router.use("/vendedor", vendedorRoutes);
router.use("/servicos", servicoRoutes);
router.use("/servicos-materiais", materialTemplateRoutes);
router.use("/orcamentos", orcamentoRoutes);

module.exports = router;
