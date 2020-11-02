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

    
    
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });
  }
}

