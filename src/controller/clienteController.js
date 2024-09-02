const knex = require("../database/connection");

exports.listarClientes = async (req, res) => {
  try {
    const clientes = await knex("Clientes").select("*");
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar clientes" });
  }
};

exports.criarCliente = async (req, res) => {
  const {
    cliente,
    email,
    senha,
    contato,
    cep,
    endereco,
    bairro,
    cidade,
    uf,
    tel,
    cel,
    ramal,
    cnpj,
    inscricao_estadual,
    fax,
  } = req.body;

  try {
    const [novoCliente] = await knex("Clientes")
      .insert({
        cliente,
        email,
        senha,
        contato,
        cep,
        endereco,
        bairro,
        cidade,
        uf,
        tel,
        cel,
        ramal,
        cnpj,
        inscricao_estadual,
        fax,
      })
      .returning("*");
    res.status(201).json(novoCliente);
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    res.status(400).json({ error: "Erro ao criar cliente" });
  }
};

exports.buscarClientePorId = async (req, res) => {
  const clienteId = req.params.id;
  try {
    const cliente = await knex("Clientes")
      .where({ cliente_id: clienteId })
      .first();

    if (!cliente) {
      res.status(404).json({ error: "Cliente não encontrado" });
    } else {
      res.json(cliente);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cliente" });
  }
};

exports.atualizarCliente = async (req, res) => {
  const clienteId = req.params.id;
  const {
    cliente,
    email,
    senha,
    contato,
    cep,
    endereco,
    bairro,
    cidade,
    uf,
    tel,
    celular,
    ramal,
    cnpj,
    inscricao_estadual,
    fax,
  } = req.body;

  try {
    const clienteExistente = await knex("Clientes")
      .where({ cliente_id: clienteId })
      .first();

    if (!clienteExistente) {
      res.status(404).json({ error: "Cliente não encontrado" });
    } else {
      await knex("Clientes").where({ cliente_id: clienteId }).update({
        cliente,
        email,
        senha,
        contato,
        cep,
        endereco,
        bairro,
        cidade,
        uf,
        tel,
        celular,
        ramal,
        cnpj,
        inscricao_estadual,
        fax,
      });

      const clienteAtualizado = await knex("Clientes")
        .where({ cliente_id: clienteId })
        .first();

      res.json(clienteAtualizado);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar cliente" });
  }
};

exports.removerCliente = async (req, res) => {
  const clienteId = req.params.id;
  try {
    const cliente = await knex("Clientes")
      .where({ cliente_id: clienteId })
      .first();

    if (!cliente) {
      res.status(404).json({ error: "Cliente não encontrado" });
    } else {
      await knex("Clientes").where({ cliente_id: clienteId }).del();

      res.json({ message: "Cliente removido com sucesso" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover cliente" });
  }
};
