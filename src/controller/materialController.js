const knex = require("../database/connection");

exports.listarMateriais = async (req, res) => {
  try {
    const materiais = await knex("Materiais").select("*");
    res.json(materiais);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar materiais" });
  }
};

exports.criarMaterial = async (req, res) => {
  const {
    codigo,
    un,
    descricao,
    classfiscal,
    vi_sub_trib,
    valor_unidade,
    ipi,
    suframa,
    icms,
    concessionaria_id,
  } = req.body;

  try {
    // Se material_id for gerado automaticamente, você não precisa incluí-lo aqui.
    const [novoMaterial] = await knex("Materiais")
      .insert({
        codigo,
        un,
        descricao,
        classfiscal,
        vi_sub_trib,
        valor_unidade,
        ipi,
        suframa,
        icms,
        concessionaria_id,
      })
      .returning("*");

    res.status(201).json(novoMaterial);
  } catch (error) {
    console.error("Erro ao criar material:", error);
    res.status(400).json({ error: "Erro ao criar material" });
  }
};

// Buscar um material por ID
exports.buscarMaterialPorId = async (req, res) => {
  const materialId = req.params.id;
  try {
    const material = await knex("Materiais")
      .where({ material_id: materialId })
      .first();

    if (!material) {
      res.status(404).json({ error: "Material não encontrado" });
    } else {
      res.json(material);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar material" });
  }
};

// Atualizar um material existente
exports.atualizarMaterial = async (req, res) => {
  const materialId = req.params.id;
  const {
    codigo,
    un,
    descricao,
    classfiscal,
    vi_sub_trib,
    valor_unidade,
    ipi,
    suframa,
    icms,
    concessionaria_id,
  } = req.body;

  try {
    const material = await knex("Materiais")
      .where({ material_id: materialId })
      .first();

    if (!material) {
      res.status(404).json({ error: "Material não encontrado" });
    } else {
      await knex("Materiais").where({ material_id: materialId }).update({
        codigo,
        un,
        descricao,
        classfiscal,
        vi_sub_trib,
        valor_unidade,
        ipi,
        suframa,
        icms,
        concessionaria_id,
      });

      const materialAtualizado = await knex("Materiais")
        .where({ material_id: materialId })
        .first();

      res.json(materialAtualizado);
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar material" });
  }
};

// Remover um material
exports.removerMaterial = async (req, res) => {
  const materialId = req.params.id;
  try {
    const material = await knex("Materiais")
      .where({ material_id: materialId })
      .first();

    if (!material) {
      res.status(404).json({ error: "Material não encontrado" });
    } else {
      await knex("Materiais").where({ material_id: materialId }).del();

      res.json({ message: "Material removido com sucesso" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover material" });
  }
};

// Listar materiais por concessionária
exports.listarMateriaisPorConcessionaria = async (req, res) => {
  const concessionariaId = req.params.id;
  try {
    const materiais = await knex("Materiais").where({
      concessionaria_id: concessionariaId,
    });

    res.json(materiais);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao listar materiais da concessionária" });
  }
};
