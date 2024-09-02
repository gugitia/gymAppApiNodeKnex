const Proposta = require("../models/proposta");

exports.listarPropostas = async (req, res) => {
  try {
    const propostas = await Proposta.findAll();
    res.json(propostas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar propostas" });
  }
};

exports.criarProposta = async (req, res) => {
  const {
    proposta_id,
    orcamento_orcamento_id,
    templateproposta_template_id,
    servico,
    descricao,
    imgs,
    potenciatotal,
    potenciaprimaria,
    potenciasecundaria,
    aprovacao,
    servico_id,
  } = req.body;
  try {
    const novaProposta = await Proposta.create({
      proposta_id,
      orcamento_orcamento_id,
      templateproposta_template_id,
      servico,
      descricao,
      imgs,
      potenciatotal,
      potenciaprimaria,
      potenciasecundaria,
      aprovacao,
      servico_id,
    });
    res.status(201).json(novaProposta);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar proposta" });
  }
};

exports.buscarPropostaPorId = async (req, res) => {
  const propostaId = req.params.id;
  try {
    const proposta = await Proposta.findByPk(propostaId);
    if (!proposta) {
      res.status(404).json({ error: "Proposta não encontrada" });
    } else {
      res.json(proposta);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar proposta" });
  }
};

exports.atualizarProposta = async (req, res) => {
  const propostaId = req.params.id;
  const {
    orcamento_orcamento_id,
    templateproposta_template_id,
    servico,
    descricao,
    imgs,
    potenciatotal,
    potenciaprimaria,
    potenciasecundaria,
    aprovacao,
    servico_id,
  } = req.body;
  try {
    const propostaAtualizada = await Proposta.findByPk(propostaId);
    if (!propostaAtualizada) {
      res.status(404).json({ error: "Proposta não encontrada" });
    } else {
      propostaAtualizada.orcamento_orcamento_id = orcamento_orcamento_id;
      propostaAtualizada.templateproposta_template_id =
        templateproposta_template_id;
      propostaAtualizada.servico = servico;
      propostaAtualizada.descricao = descricao;
      propostaAtualizada.imgs = imgs;
      propostaAtualizada.potenciatotal = potenciatotal;
      propostaAtualizada.potenciaprimaria = potenciaprimaria;
      propostaAtualizada.potenciasecundaria = potenciasecundaria;
      propostaAtualizada.aprovacao = aprovacao;
      propostaAtualizada.servico_id = servico_id;

      await propostaAtualizada.save();
      res.json(propostaAtualizada);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar proposta" });
  }
};

exports.removerProposta = async (req, res) => {
  const propostaId = req.params.id;
  try {
    const proposta = await Proposta.findByPk(propostaId);
    if (!proposta) {
      res.status(404).json({ error: "Proposta não encontrada" });
    } else {
      await proposta.destroy();
      res.json({ message: "Proposta removida com sucesso" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover proposta" });
  }
};
