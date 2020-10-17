const { Comentario } = require("../models");
const validatorjs = require("validatorjs");

module.exports.create = async (req, res) => {
  
  try {
    
    const {
      texto,
      clienteId,
      parentId,
      userAuth
    } = req.body;

    const validator = new validatorjs(req.body, {
      texto: "required|string",
      clienteId: "required|integer",
      parentId: "required|integer",
    });

    if (validator) return res.status(500).json({
      message: "invalid_params",
      errors: validator.errors.errors
    });

    const comentario = await Comentario.create({
      texto,
      clienteId,
      parentId,
      usuarioId: userAuth.id
    });

    if (!comentario) return res.status(500).json({
      message: "can't create comentario"
    });

    return res.status(201).json({
      message: "created",
      comentario
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
      clienteId
    } = req.params;

    const comentarios = await Comentario.findAll({
      where: {
        clienteId,
        parentId: 0
      }
    });

    return res.json({
      comentarios
    });
    
  } catch (e) {
    
    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });

  }

}

module.exports.findChildrenByParent = async (req, res) => {

  try {

    const {
      parentId
    } = req.params;

    const comentarios = await Comentario.findAll({
      where: {
        parentId
      }
    });

    return res.json({
      comentarios
    });
    
  } catch (e) {
    
    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });

  }

}
