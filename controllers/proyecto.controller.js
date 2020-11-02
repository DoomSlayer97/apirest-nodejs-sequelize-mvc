const { Proyecto } = require("../models");
const validatorjs = require("validatorjs");
const pager = require("../helpers/paginator.helper");

module.exports.create = async (req, res) => {
  try {

    const {
      name,
      descripcion
    } = req.body;

    const validator = new validatorjs(req.body, {
      name: "required|string"
    });
    
    if (validator.fails()) return res.status(500).json({
      message: "invalid_params",
      errors: validator.errors.errors
    });

    const proyecto = await Proyecto.create({
      name,
      descripcion
    });

    if (!proyecto) return res.status(500).json({
      message: "created_error"
    });

    return res.status(201).json({
      message: "created",
      proyecto
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

    const count = await Proyecto.count({ where: queryWhere });

    const paginator = pager(count, page, items);

    const proyectos = await Proyecto.findAll({
      limit: paginator.itemCount,
      offset: paginator.offset,
      where: queryWhere
    });

    return res.json({
      proyectos
    });
    
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });    
  }
}

