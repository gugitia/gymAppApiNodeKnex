const Relation10 = require("../models/relation_10");

exports.listarRelacoes10 = async (req, res) => {
  try {
    const relacoes10 = await Relation10.findAll();
    res.json(relacoes10);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar relações 10" });
  }
};

exports.criarRelacao10 = async (req, res) => {
  const { material_orcamento_id, material_id } = req.body;
  try {
    const novaRelacao10 = await Relation10.create({
      material_orcamento_id,
      material_id,
    });
    res.status(201).json(novaRelacao10);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar relação 10" });
  }
};

exports.buscarRelacao10PorId = async (req, res) => {
  const relacao10Id = req.params.id;
  try {
    const relacao10 = await Relation10.findByPk(relacao10Id);
    if (!relacao10) {
      res.status(404).json({ error: "Relação 10 não encontrada" });
    } else {
      res.json(relacao10);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar relação 10" });
  }
};

exports.removerRelacao10 = async (req, res) => {
  const relacao10Id = req.params.id;
  try {
    const relacao10 = await Relation10.findByPk(relacao10Id);
    if (!relacao10) {
      res.status(404).json({ error: "Relação 10 não encontrada" });
    } else {
      await relacao10.destroy();
      res.json({ message: "Relação 10 removida com sucesso" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover relação 10" });
  }
};
