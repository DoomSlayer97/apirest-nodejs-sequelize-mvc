const { TipoCredito } = require("../models");
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

    const tipoCredito = await TipoCredito.create({ name });

    if (!tipoCredito) return res.status(500).json({
      message: "create_error"
    });

    return res.status(201).json({
      message: "created",
      tipoCredito
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

    const queryWhere = {
      isDeleted: 0
    };

    const count = await TipoCredito.count({ where: queryWhere });

    const paginator = pager(count, page, items);

    const tiposCredito = await TipoCredito.findAll({
      limit: paginator.itemCount,
      offset: paginator.offset,
      where: queryWhere
    });

    return res.json({
      tiposCredito
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

    const tipoCredito = await TipoCredito.findOne({ where: { id } });

    return res.json({
      tipoCredito
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

    const updated = await TipoCredito.update({
      name
    }, { where: { id } });

    if (!updated) return res.status(500).json({
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

    const deleted = await TipoCredito.update({
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

