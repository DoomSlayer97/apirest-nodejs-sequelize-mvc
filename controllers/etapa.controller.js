const { Etapa } = require("../models");
const validatorjs = require("validatorjs");
const pager = require("../helpers/paginator.helper");

module.exports.create = async (req, res) => {
  try {

    const {
      name
    } = req.body;

    const validator = new validatorjs(req.body, {
      name: "required|string"
    });

    if (validator.fails()) return res.status(500).json({
      message: "invalid_params",
      errors: validator.errors.errors
    });

    const etapa = await Etapa.create({
      name
    });

    return res.status(201).json({
      message: "created",
      etapa
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
      items
    } = req.query;

    let count = await Etapa.count({ where: { isDeleted: 0 } });

    const paginator = pager(count, page, items);

    const etapas = await Etapa.findAll({
      limit: paginator.itemCount,
      offset: paginator.offset,
      where: {
        isDeleted: 0
      }
    });

    return res.json({
      etapas
    });
    
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });
  }
}

module.exports.findOne = async (req, res) => {
  try {

    const { id } = req.params;
    
    const etapa = await Etapa.findOne({ where: { id } });

    return res.json({
      etapa
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

    const {
      name
    } = req.body;

    const { id } = req.params;

    const validator = new validatorjs(req.body, {
      name: "required|string"
    });

    if (validator.fails()) return res.status(500).json({
      message: "invalid_params",
      errors: validator.errors.errors
    });

    const update = await Etapa.update({
      name
    }, { where: { id } });

    if (!update) res.status(500).json({
      message: "update_error"
    });

    return res.json({
      message: "updated"
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

    const deleted = await Etapa.update({
      isDeleted: 1
    }, { where: { id } });

    if (!deleted) return res.status(500).json({
      message: "delete_error"
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



