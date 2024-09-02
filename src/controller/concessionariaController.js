const knex = require("../database/connection");

exports.listarConcessionarias = async (req, res) => {
  try {
    const concessionarias = await knex("Concessionarias").select("*");
    res.json(concessionarias);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar concessionárias" });
  }
};

exports.criarConcessionaria = async (req, res) => {
  const { nome } = req.body;
  try {
    const [novaConcessionaria] = await knex("Concessionarias")
      .insert({ nome })
      .returning("*");
    res.status(201).json(novaConcessionaria);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar concessionária" });
  }
};

exports.buscarConcessionariaPorId = async (req, res) => {
  const concessionariaId = req.params.id;
  try {
    const concessionaria = await knex("Concessionarias")
      .where({ concessionaria_id: concessionariaId })
      .first();

    if (!concessionaria) {
      res.status(404).json({ error: "Concessionária não encontrada" });
    } else {
      res.json(concessionaria);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar concessionária" });
  }
};

exports.atualizarConcessionaria = async (req, res) => {
  const concessionariaId = req.params.id;
  const { nome } = req.body;
  try {
    const concessionaria = await knex("Concessionarias")
      .where({ concessionaria_id: concessionariaId })
      .first();

    if (!concessionaria) {
      res.status(404).json({ error: "Concessionária não encontrada" });
    } else {
      await knex("Concessionarias")
        .where({ concessionaria_id: concessionariaId })
        .update({ nome });

      const concessionariaAtualizada = await knex("Concessionarias")
        .where({ concessionaria_id: concessionariaId })
        .first();

      res.json(concessionariaAtualizada);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar concessionária" });
  }
};

exports.removerConcessionaria = async (req, res) => {
  const concessionariaId = req.params.id;
  try {
    const concessionaria = await knex("Concessionarias")
      .where({ concessionaria_id: concessionariaId })
      .first();

    if (!concessionaria) {
      res.status(404).json({ error: "Concessionária não encontrada" });
    } else {
      await knex("Concessionarias")
        .where({ concessionaria_id: concessionariaId })
        .del();

      res.json({ message: "Concessionária removida com sucesso" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover concessionária" });
  }
};
