const knex = require("../database/connection");

// Listar todos os orçamentos
exports.listarOrcamentos = async (req, res) => {
  try {
    const orcamentos = await knex("Orcamentos").select("*");
    res.json(orcamentos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar orçamentos" });
  }
};

// Criar um novo orçamento
exports.criarOrcamento = async (req, res) => {
  const {
    cliente_id,
    vendedor_id,
    concessionaria,
    servico,
    potenciatotal,
    potenciaprimaria,
    potenciasecundaria,
    obs,
    valortotal,
  } = req.body;

  try {
    const [novoOrcamento] = await knex("Orcamentos")
      .insert({
        cliente_id,
        vendedor_id,
        concessionaria,
        servico,
        potenciatotal,
        potenciaprimaria,
        potenciasecundaria,
        obs,
        valortotal,
      })
      .returning("*");

    res.status(201).json(novoOrcamento);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar orçamento" });
  }
};

// Buscar um orçamento por ID
exports.buscarOrcamentoPorId = async (req, res) => {
  const orcamentoId = req.params.id;

  try {
    const orcamento = await knex("Orcamentos")
      .where({ orcamento_id: orcamentoId })
      .first();

    if (!orcamento) {
      res.status(404).json({ error: "Orçamento não encontrado" });
    } else {
      res.json(orcamento);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar orçamento" });
  }
};

// Atualizar um orçamento por ID
exports.atualizarOrcamento = async (req, res) => {
  const orcamentoId = req.params.id;
  const {
    cliente_id,
    vendedor_id,
    concessionaria,
    servico,
    potenciatotal,
    potenciaprimaria,
    potenciasecundaria,
    obs,
    valortotal,
  } = req.body;

  try {
    const orcamento = await knex("Orcamentos")
      .where({ orcamento_id: orcamentoId })
      .first();

    if (!orcamento) {
      res.status(404).json({ error: "Orçamento não encontrado" });
    } else {
      await knex("Orcamentos").where({ orcamento_id: orcamentoId }).update({
        cliente_id,
        vendedor_id,
        concessionaria,
        servico,
        potenciatotal,
        potenciaprimaria,
        potenciasecundaria,
        obs,
        valortotal,
      });

      const orcamentoAtualizado = await knex("Orcamentos")
        .where({ orcamento_id: orcamentoId })
        .first();

      res.json(orcamentoAtualizado);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar orçamento" });
  }
};

// Remover um orçamento por ID
exports.removerOrcamento = async (req, res) => {
  const orcamentoId = req.params.id;

  try {
    const orcamento = await knex("Orcamentos")
      .where({ orcamento_id: orcamentoId })
      .first();

    if (!orcamento) {
      res.status(404).json({ error: "Orçamento não encontrado" });
    } else {
      await knex("Orcamentos").where({ orcamento_id: orcamentoId }).del();

      res.json({ message: "Orçamento removido com sucesso" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover orçamento" });
  }
};
