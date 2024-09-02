const knex = require("../database/connection");

exports.listarVendedores = async (req, res) => {
  try {
    const vendedores = await knex("Vendedores").select("*");
    res.json(vendedores);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar vendedores" });
  }
};

exports.criarVendedor = async (req, res) => {
  const { nome, cell, email, senha } = req.body;
  try {
    const [novoVendedor] = await knex("Vendedores")
      .insert({
        nome,
        cell,
        email,
        senha,
      })
      .returning("*");
    res.status(201).json(novoVendedor);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar vendedor" });
  }
};

exports.buscarVendedorPorId = async (req, res) => {
  const vendedorId = req.params.id;
  try {
    const vendedor = await knex("Vendedores")
      .where({ vendedor_id: vendedorId })
      .first();

    if (!vendedor) {
      res.status(404).json({ error: "Vendedor não encontrado" });
    } else {
      res.json(vendedor);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar vendedor" });
  }
};

exports.atualizarVendedor = async (req, res) => {
  const vendedorId = req.params.id;
  const { nome, cell, email, senha } = req.body;
  try {
    const vendedor = await knex("Vendedores")
      .where({ vendedor_id: vendedorId })
      .first();

    if (!vendedor) {
      res.status(404).json({ error: "Vendedor não encontrado" });
    } else {
      await knex("Vendedores").where({ vendedor_id: vendedorId }).update({
        nome,
        cell,
        email,
        senha,
      });

      const vendedorAtualizado = await knex("Vendedores")
        .where({ vendedor_id: vendedorId })
        .first();

      res.json(vendedorAtualizado);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar vendedor" });
  }
};

exports.removerVendedor = async (req, res) => {
  const vendedorId = req.params.id;
  try {
    const vendedor = await knex("Vendedores")
      .where({ vendedor_id: vendedorId })
      .first();

    if (!vendedor) {
      res.status(404).json({ error: "Vendedor não encontrado" });
    } else {
      await knex("Vendedores").where({ vendedor_id: vendedorId }).del();

      res.json({ message: "Vendedor removido com sucesso" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover vendedor" });
  }
};
