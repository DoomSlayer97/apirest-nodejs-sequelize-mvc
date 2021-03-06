const { Proyecto } = require("../models");
const validatorjs = require("validatorjs");
const pager = require("../helpers/paginator.helper");
const { update } = require("./clasificacion.controller");

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

module.exports.findOne = async (req, res) => {
  try {

    const { id } = req.params;

    const proyecto = await Proyecto.findOne({ where: { id } });

    return res.json({
      proyecto
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
      name,
      descripcion
    } = req.body;

    const { id } = req.params;

    const validator = new validatorjs(req.body, {
      name: "required|string"
    });
    
    if (validator.fails()) return res.status(500).json({
      message: "invalid_params",
      errors: validator.errors.errors
    });

    const updated = await Proyecto.update({
      name,
      descripcion
    }, { where: { id } });

    if (!updated) return res.status(500).json({
      message: "update_error"
    });
    
    return res.json({
      message: "updated"
    })
    
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

    const deleted = await Proyecto.update({
      isDeleted: 1
    }, { where: { id } });

    if (!deleted) return res.status(500).json({
      message: "delete_error"
    });

    return res.json({
      message: "deleted"
    })
    
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });
  }
}

