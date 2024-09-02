const MaterialOrcamento = require("../models/materialOrcamento");

exports.listarMateriaisOrcamento = async (req, res) => {
  try {
    const materiaisOrcamento = await MaterialOrcamento.findAll();
    res.json(materiaisOrcamento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar materiais orçamento" });
  }
};

exports.criarMaterialOrcamento = async (req, res) => {
  const {
    material_orcamento_id,
    material_id,
    orcamento_id,
    quantidade,
    valortotal,
  } = req.body;
  try {
    const novoMaterialOrcamento = await MaterialOrcamento.create({
      material_orcamento_id,
      material_id,
      orcamento_id,
      quantidade,
      valortotal,
    });
    res.status(201).json(novoMaterialOrcamento);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar material orçamento" });
  }
};

exports.buscarMaterialOrcamentoPorId = async (req, res) => {
  const materialOrcamentoId = req.params.id;
  try {
    const materialOrcamento = await MaterialOrcamento.findByPk(
      materialOrcamentoId
    );
    if (!materialOrcamento) {
      res.status(404).json({ error: "Material orçamento não encontrado" });
    } else {
      res.json(materialOrcamento);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar material orçamento" });
  }
};

exports.atualizarMaterialOrcamento = async (req, res) => {
  const materialOrcamentoId = req.params.id;
  const { material_id, orcamento_id, quantidade, valortotal } = req.body;
  try {
    const materialOrcamentoAtualizado = await MaterialOrcamento.findByPk(
      materialOrcamentoId
    );
    if (!materialOrcamentoAtualizado) {
      res.status(404).json({ error: "Material orçamento não encontrado" });
    } else {
      materialOrcamentoAtualizado.material_id = material_id;
      materialOrcamentoAtualizado.orcamento_id = orcamento_id;
      materialOrcamentoAtualizado.quantidade = quantidade;
      materialOrcamentoAtualizado.valortotal = valortotal;

      await materialOrcamentoAtualizado.save();
      res.json(materialOrcamentoAtualizado);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar material orçamento" });
  }
};

exports.removerMaterialOrcamento = async (req, res) => {
  const materialOrcamentoId = req.params.id;
  try {
    const materialOrcamento = await MaterialOrcamento.findByPk(
      materialOrcamentoId
    );
    if (!materialOrcamento) {
      res.status(404).json({ error: "Material orçamento não encontrado" });
    } else {
      await materialOrcamento.destroy();
      res.json({ message: "Material orçamento removido com sucesso" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover material orçamento" });
  }
};
