const { TipoCredito } = require("../models");
const validatorjs = require("validatorjs");

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

    const tipoCredito = await TipoCredito.create({
      name
    });

    if (!tipoCredito) return res.status(500).json({
      message: "save_error"
    });

    return res.status(201).json({
      message: "saved",
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

    const tipoCreditos = await TipoCredito.findAll({
      isDeleted: false
    });

    return res.json({
      tipoCreditos
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

    const {
      id
    } = req.params;

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

    const { id } = req.params;

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

    const updated = await TipoCredito.update({
      name
    }, {
      where: {
        id
      }
    });

    if (!updated) return res.status(500).json({
      message: "failed_save"
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
      isDeleted: false
    }, {
      where: {
        id
      }
    });

    if (!deleted) return res.status(500).json({
      message: "fail_delete"
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

