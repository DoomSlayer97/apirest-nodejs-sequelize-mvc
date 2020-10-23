const { Proyecto } = require("../models");
const validatorjs = require("validatorjs");

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


