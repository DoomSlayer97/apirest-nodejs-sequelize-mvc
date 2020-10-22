const { Cliente, TipoCredito } = require("../models");
const validatorjs = require("validatorjs");
const { Op, literal } = require("sequelize");
const sequelize = require("sequelize");
const { clientesExcel } = require("../utils/excel.util");

module.exports.generateSheetDocument = async (req, res) => {
  try {

    const excel = new clientesExcel();

    const clientesData = await Cliente.findAll({
      include: {
        association: "tipoCredito",
        required: true,
        attributes: ["name"],
        nested: false
      }
    });

    return res.json({
      clientesData
    });

    excel.setDataRows(clientesData);

    return excel.buildDocument(res);
    
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });
  }
}

module.exports.create = async (req, res) => {
  
  try {
    
    const {
      nombres,
      apellidoPat,
      apellidoMat,
      email,
      tel,
      rfc,
      curp,
      fechaNacimiento,
      tipoCreditoId
    } = req.body;

    const validator = new validatorjs(req.body, {
      nombres: "required|string",
      apellidoPat: "required|string",
      apellidoMat: "required|string",
      email: "required|string|email",
      tel: "required|string",
      tipoCreditoId: "required|integer"
    });

    if (validator.fails()) return res.status(500).json({
      message: "invalid_params",
      errors: validator.errors.errors
    });

    const cliente = await Cliente.create({
      nombres,
      apellidoPat,
      apellidoMat,
      email,
      tel,
      rfc,
      curp,
      fechaNacimiento,
      tipoCreditoId
    });

    return res.status(201).json({
      message: "created",
      cliente
    });

  } catch (e) {

    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });
    
  }

}

module.exports.findAllFilter = async (req, res) => {

  try {

    const {
      nombre,
      email,
      tel
    } = req.query;

    const whereDynamic = {
      regStatus: false
    };

    if (nombre)
      whereDynamic.fullname = sequelize.where(
        sequelize.fn(
          "concat",
          sequelize.col("nombres"),
          " ",
          sequelize.col("apellidoPat"),
          " ",
          sequelize.col("apellidoMat"),
        ), { [sequelize.Op.like]: `%${nombre}%` },
      );
    
    if (email)
      whereDynamic.email = {
        [Op.like]: `%${email}%`
      }
    
    if (tel)
      whereDynamic.tel = {
        [Op.like]: `%${tel}%`
      }

    const clientes = await Cliente.findAll({
      where: whereDynamic,
      attributes: [
        'id',
        'email',
        'tel',
        'rfc',
        'fechaNacimiento',
        [sequelize.literal(" concat(nombres, ' ', apellidoPat, ' ', apellidoMat) "), "clienteNombre"]
      ]
    });

    return res.json({
      clientes
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

    const clientes = await Cliente.findAll({
      where: {
        regStatus: 0
      },
      attributes: [
        'id',
        'email',
        'tel',
        'rfc',
        'fechaNacimiento',
        [sequelize.literal(" concat(nombres, ' ', apellidoPat, ' ', apellidoMat) "), "clienteNombre"]
      ]
    });

    return res.status(201).json({
      clientes
    });
    
  } catch (error) {

    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });

  }
  
}

module.exports.findOne = async (req, res) => {

  try {

    const { id } = req.params;

    const cliente = await Cliente.findOne({
      where: {
        id,
        regStatus: 0
      }
    });

    return res.json({
      cliente
    });

  } catch (e) {

    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });

  }

}

module.exports.updateOne = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      nombres,
      apellidoPat,
      apellidoMat,
      email,
      tel,
      rfc,
      curp,
      fechaNacimiento
    } = req.body;

    const validator = new validatorjs(req.body, {
      nombres: "required|string",
      apellidoPat: "required|string",
      apellidoMat: "required|string",
      email: "required|string|email",
      tel: "required|string",
    });

    if (validator.fails()) return res.status(500).json({
      message: "invalid_params",
      errors: validator.errors.errors
    });

    await Cliente.update({
      nombres,
      apellidoPat,
      apellidoMat,
      email,
      tel,
      rfc,
      curp,
      fechaNacimiento
    }, { where: { id } });

    const cliente = await Cliente.findOne({ where: { id } });

    return res.status(200).json({
      message: "updated",
      cliente
    });
    
  } catch (error) {
    
    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });

  }

}

module.exports.deleteOne = async (req, res) => {

  try {

    const { id } = req.params;

    await Cliente.update({
      regStatus: 1
    }, { where: { id } });

    return res.status(200).json({
      message: "deleted"
    })
    
  } catch (e) {
    
    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });


  }

}

