const knex = require("../database/connection");

exports.listarMaterialTemplates = async (req, res) => {
  try {
    const materialTemplates = await knex("MaterialTemplate").select("*");
    res.json(materialTemplates);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar Material Templates" });
  }
};

exports.criarMaterialTemplate = async (req, res) => {
  const {
    material_Id,
    template_Id,
    concessionaria_id,
    quantidade,
    valortotal,
  } = req.body;

  console.log("Dados recebidos:", req.body);

  try {
    const [novoMaterialTemplate] = await knex("MaterialTemplate")
      .insert({
        material_Id,
        template_Id,
        concessionaria_id,
        quantidade,
        valortotal,
      })
      .returning("*");

    console.log("Novo Material Template criado:", novoMaterialTemplate);

    res.status(201).json(novoMaterialTemplate);
  } catch (error) {
    console.error("Erro ao criar Material Template:", error);
    res.status(400).json({ error: "Erro ao criar Material Template" });
  }
};

exports.buscarMaterialTemplatePorId = async (req, res) => {
  const materialTemplateId = req.params.id;
  try {
    const materialTemplate = await knex("MaterialTemplate")
      .where({ material_template_id: materialTemplateId })
      .first();

    if (!materialTemplate) {
      res.status(404).json({ error: "Material Template não encontrado" });
    } else {
      res.json(materialTemplate);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar Material Template" });
  }
};

exports.atualizarMaterialTemplate = async (req, res) => {
  const materialTemplateId = req.params.id;
  const {
    material_Id,
    template_Id,
    concessionaria_id,
    quantidade,
    valortotal,
  } = req.body;

  try {
    const materialTemplate = await knex("MaterialTemplate")
      .where({ material_template_id: materialTemplateId })
      .first();

    if (!materialTemplate) {
      res.status(404).json({ error: "Material Template não encontrado" });
    } else {
      await knex("MaterialTemplate")
        .where({ material_template_id: materialTemplateId })
        .update({
          material_Id,
          template_Id,
          concessionaria_id,
          quantidade,
          valortotal,
        });

      const materialTemplateAtualizado = await knex("MaterialTemplate")
        .where({ material_template_id: materialTemplateId })
        .first();

      res.json(materialTemplateAtualizado);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar Material Template" });
  }
};

exports.removerMaterialTemplate = async (req, res) => {
  const materialTemplateId = req.params.id;

  try {
    const materialTemplate = await knex("MaterialTemplate")
      .where({ material_template_id: materialTemplateId })
      .first();

    if (!materialTemplate) {
      res.status(404).json({ error: "Material Template não encontrado" });
    } else {
      await knex("MaterialTemplate")
        .where({ material_template_id: materialTemplateId })
        .del();

      res.json({ message: "Material Template removido com sucesso" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover Material Template" });
  }
};

exports.listarMateriaisPorServico = async (req, res) => {
  const servico_id = req.params.id;
  try {
    const materiais = await knex("MaterialTemplate")
      .join(
        "Materiais",
        "MaterialTemplate.material_Id",
        "=",
        "Materiais.material_id"
      )
      .select(
        "Materiais.material_id",
        "MaterialTemplate.concessionaria_id",
        "MaterialTemplate.quantidade",
        "MaterialTemplate.valortotal",
        "Materiais.codigo",
        "Materiais.un",
        "Materiais.descricao",
        "Materiais.classfiscal",
        "Materiais.vi_sub_trib",
        "Materiais.valor_unidade",
        "Materiais.ipi",
        "Materiais.suframa",
        "Materiais.icms"
      )
      .where("MaterialTemplate.template_Id", servico_id);

    res.json(materiais);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar materiais do serviço" });
  }
};
