const Template = require("../models/template");

exports.listarTemplates = async (req, res) => {
  try {
    const templates = await Template.findAll();
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar templates de propostas" });
  }
};

exports.criarTemplate = async (req, res) => {
  const {
    template_id,
    nome,
    potenciatotal,
    potenciaprimaria,
    potenciasecundaria,
    servico_id,
  } = req.body;
  try {
    const novoTemplate = await Template.create({
      template_id,
      nome,
      potenciatotal,
      potenciaprimaria,
      potenciasecundaria,
      servico_id,
    });
    res.status(201).json(novoTemplate);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar template de proposta" });
  }
};

exports.buscarTemplatePorId = async (req, res) => {
  const templateId = req.params.id;
  try {
    const template = await Template.findByPk(templateId);
    if (!template) {
      res.status(404).json({ error: "Template de proposta não encontrado" });
    } else {
      res.json(template);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar template de proposta" });
  }
};

exports.atualizarTemplate = async (req, res) => {
  const templateId = req.params.id;
  const {
    nome,
    potenciatotal,
    potenciaprimaria,
    potenciasecundaria,
    servico_id,
  } = req.body;
  try {
    const templateAtualizado = await TemplateProposta.findByPk(templateId);
    if (!templateAtualizado) {
      res.status(404).json({ error: "Template de proposta não encontrado" });
    } else {
      templateAtualizado.nome = nome;
      templateAtualizado.potenciatotal = potenciatotal;
      templateAtualizado.potenciaprimaria = potenciaprimaria;
      templateAtualizado.potenciasecundaria = potenciasecundaria;
      templateAtualizado.servico_id = servico_id;

      await templateAtualizado.save();
      res.json(templateAtualizado);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar template de proposta" });
  }
};

exports.removerTemplate = async (req, res) => {
  const templateId = req.params.id;
  try {
    const template = await Template.findByPk(templateId);
    if (!template) {
      res.status(404).json({ error: "Template de proposta não encontrado" });
    } else {
      await template.destroy();
      res.json({ message: "Template de proposta removido com sucesso" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover template de proposta" });
  }
};
