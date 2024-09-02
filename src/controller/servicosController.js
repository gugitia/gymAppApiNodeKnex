const knex = require("../database/connection");

exports.listarServicos = async (req, res) => {
  try {
    const servicos = await knex("TemplateProposta").select("*");
    res.json(servicos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar serviços" });
  }
};

exports.criarServico = async (req, res) => {
  const {
    concessionaria_id,
    nome,
    potenciatotal,
    potenciaprimaria,
    potenciasecundaria,
    valortotal,
  } = req.body;
  try {
    const [novoServico] = await knex("TemplateProposta")
      .insert({
        concessionaria_id,
        nome,
        potenciatotal,
        potenciaprimaria,
        potenciasecundaria,
        valortotal,
      })
      .returning("*");
    res.status(201).json(novoServico);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar serviço" });
  }
};

exports.buscarServicoPorId = async (req, res) => {
  const servicoId = req.params.id;
  try {
    const servico = await knex("TemplateProposta")
      .where({ servico_id: servicoId })
      .first();

    if (!servico) {
      res.status(404).json({ error: "Serviço não encontrado" });
    } else {
      res.json(servico);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar serviço" });
  }
};

exports.atualizarServico = async (req, res) => {
  const servicoId = req.params.id;
  const {
    concessionaria_id,
    nome,
    potenciatotal,
    potenciaprimaria,
    potenciasecundaria,
    valortotal,
  } = req.body;
  try {
    const servico = await knex("TemplateProposta")
      .where({ servico_id: servicoId })
      .first();

    if (!servico) {
      res.status(404).json({ error: "Serviço não encontrado" });
    } else {
      await knex("TemplateProposta").where({ servico_id: servicoId }).update({
        concessionaria_id,
        nome,
        potenciatotal,
        potenciaprimaria,
        potenciasecundaria,
        valortotal,
      });

      const servicoAtualizado = await knex("TemplateProposta")
        .where({ servico_id: servicoId })
        .first();

      res.json(servicoAtualizado);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar serviço" });
  }
};

exports.removerServico = async (req, res) => {
  const servicoId = req.params.id;
  try {
    const servico = await knex("TemplateProposta")
      .where({ servico_id: servicoId })
      .first();

    if (!servico) {
      res.status(404).json({ error: "Serviço não encontrado" });
    } else {
      await knex("TemplateProposta").where({ servico_id: servicoId }).del();

      res.json({ message: "Serviço removido com sucesso" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover serviço" });
  }
};

exports.listarServicosPorConcessionaria = async (req, res) => {
  const concessionariaId = req.params.id;
  try {
    const servicos = await knex("TemplateProposta").where({
      concessionaria_id: concessionariaId,
    });

    res.json(servicos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao listar serviços da concessionária" });
  }
};
