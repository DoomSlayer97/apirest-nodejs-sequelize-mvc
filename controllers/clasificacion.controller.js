const { Clasificacion } = require("../models");
const validatorjs = require("validatorjs");
const pager = require("../helpers/paginator.helper");

module.exports.create = async (req, res) => {
  try {

    const {
      name,
      etapaId
    } = req.body;

    const validator = new validatorjs(req.body, {
      name: "required|string",
      etapaId: "required|integer"
    });

    if (validator.fails()) return res.status(500).json({
      message: "invalid_params"
    });

    const clasificacion = await Clasificacion.create({
      name,
      etapaId
    });
    
    if (!clasificacion) return res.status(500).json({
      message: "save_error"
    });

    return res.status(201).json({
      message: "save",
      clasificacion
    });
    
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });
  }
}

module.exports.findAll = async (req, res) => {
  try {

    const {
      page,
      items,
      etapaId
    } = req.query;

    const queryWhere = {
      isDeleted: 0,
      etapaId
    };

    const count = await Clasificacion.count({ where: queryWhere });

    const paginator = pager(count, page, items);

    const clasificaciones = await Clasificacion.findAll({
      limit: paginator.itemCount,
      offset: paginator.offset,
      where: queryWhere
    });

    return res.json({
      clasificaciones
    });
    
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });
  }
}

module.exports.findOne = async(req, res) => {
  try {

    const { id } = req.params;

    const clasificacion = await Clasificacion.findOne({ where: { id } });

    return res.json({
      clasificacion
    });
    
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });
  }
}

module.exports.update = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      name,
      etapaId
    } = req.body;

    const validator = new validatorjs(req.body, {
      name: "required|string",
      etapaId: "required|integer"
    });

    if (validator.fails()) return res.status(500).json({
      message: "invalid_params"
    });

    const clasificacion = await Clasificacion.update({
      name,
      etapaId
    }, { where: { id } });
    
    
    if (!clasificacion) return res.status(500).json({
      message: "save_error"
    });

    return res.status(201).json({
      message: "save"
    });
    
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });
  }
}

module.exports.deleteOne = async (req, res) => {
  try {

    const { id } = req.params;
    
    const clasificacion = await Clasificacion.update({
      isDeleted: true
    }, { where: { id } });

    if (!clasificacion) return res.status(500).json({
      message: "error_delete"
    });

    return res.json({
      message: "deleted"
    });
    
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });
  }
}

module.exports.createMany = async (req, res) => {
  try {

    const {
      clasificaciones
    } = req.body;

    const errors = [];

    clasificaciones.forEach((item, index) => {

      const validator = new validatorjs(item, {
        name: "required|string",
        etapaId: "required|integer"
      });

      if (validator.fails())
        errors.push({
          itemIndex: index,
          error: validator.errors.errors
        });
      
    });
    
    if (errors.length > 0) return res.status(500).json({
      message: "invalid_params",
      errors
    });

    const created = await Clasificacion.bulkCreate(clasificaciones);

    return res.status(201).json({
      message: "created_many",
      created
    });

  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });    
  }
}
