const Relation9 = require("../models/relation_9");

exports.listarRelacoes9 = async (req, res) => {
  try {
    const relacoes9 = await Relation9.findAll();
    res.json(relacoes9);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar relações 9" });
  }
};

exports.criarRelacao9 = async (req, res) => {
  const { orcamento_id, material_orcamento_id } = req.body;
  try {
    const novaRelacao9 = await Relation9.create({
      orcamento_id,
      material_orcamento_id,
    });
    res.status(201).json(novaRelacao9);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar relação 9" });
  }
};

exports.buscarRelacao9PorId = async (req, res) => {
  const relacao9Id = req.params.id;
  try {
    const relacao9 = await Relation9.findByPk(relacao9Id);
    if (!relacao9) {
      res.status(404).json({ error: "Relação 9 não encontrada" });
    } else {
      res.json(relacao9);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar relação 9" });
  }
};

exports.removerRelacao9 = async (req, res) => {
  const relacao9Id = req.params.id;
  try {
    const relacao9 = await Relation9.findByPk(relacao9Id);
    if (!relacao9) {
      res.status(404).json({ error: "Relação 9 não encontrada" });
    } else {
      await relacao9.destroy();
      res.json({ message: "Relação 9 removida com sucesso" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover relação 9" });
  }
};
