const { Cliente } = require("../models");
const validatorjs = require("validatorjs");
const sequelize = require("sequelize");
const { clientesExcel } = require("../utils/excel.util");
const faker = require("faker");
const pager = require("../helpers/paginator.helper");
const { queryFilter } = require("../helpers/clientes.helper");

function randomNumber(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}


module.exports.generateThousandRegs = async (req, res) => {
  try {

    let regsClientes = [];

    for (let i = 0; i < 10000; i++) {

      regsClientes.push({
        nombres: faker.name.findName(),
        apellidoMat: faker.name.lastName(),
        apellidoPat: faker.name.lastName(),
        email: faker.internet.email(),
        tel: faker.phone.phoneNumber(),
        fechaNacimiento: new Date(),
        clasificacionId: randomNumber(1, 7),
        tipoCreditoId: 1,
        proyectoId: 1
      });

    }

    const clientes = await Cliente.bulkCreate(regsClientes);

    return res.status(201).json({
      message: "CREATED!",
      clientes
    })
    
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });
  }
}

module.exports.generateSheetDocument = async (req, res) => {
  try {

    const {
      page,
      items
    } = req.query;
    
    const excel = new clientesExcel();

    const clientesData = await Cliente.findAll({
      include: [
        {
          association: "tipoCredito",
          attributes: ["name"]
        },
        {
          association: "proyecto",
          attributes: ["name"]
        }
      ]
    });

    let mapedData = clientesData.map((item) => ({
      nombres: item.nombres,
      apellidoPat: item.apellidoPat,
      apellidoMat: item.apellidoMat,
      email: item.email,
      tel: item.tel,
      tipoCredito: item.tipoCredito.name,
      proyecto: item.proyecto.name
    }));

    excel.setDataRows(mapedData);

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
      tipoCreditoId,
      proyectoId
    } = req.body;

    const validator = new validatorjs(req.body, {
      nombres: "required|string",
      apellidoPat: "required|string",
      apellidoMat: "required|string",
      email: "required|string|email",
      tel: "required|string",
      tipoCreditoId: "required|integer",
      proyectoId: "required|integer",
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
      tipoCreditoId,
      proyectoId
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
      page,
      items
    } = req.query;

    const queryParams = await queryFilter(req);
    
    const clientesCount = await Cliente.count({ where: queryParams });

    const paginator = pager(clientesCount, page, items);

    const clientes = await Cliente.findAll({
      limit: paginator.itemCount,
      offset: paginator.offset,
      where: queryParams,
      include: [
        {
          association: "clasificacion",
          attributes: ["name", "id"],
          where: {
            id: req.body.clasificaciones
          },
          include: [
            {
              association: "etapa",
              attributes: ["name", "id"],
              where: {
                id: req.body.etapas
              }
            }
          ]
        },
        {
          association: "tipoCredito",
          attributes: ["name", "id"]
        },
        {
          association: "proyecto",
          attributes: ["name", "id"]
        }
      ],
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
      paginator,
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

    const {
      page,
      items
    } = req.query;

    const pagination = pager(
      await Cliente.count({ where: { isDeleted: 0 } }),
        page,
        items
    );
    
    const clientes = await Cliente.findAll({
      limit: pagination.itemCount,
      offse: pagination.offset,
      where: {
        isDeleted: 0
      },
      include: ["tipoCredito"],
      attributes: [
        'id',
        'email',
        'tel',
        'rfc',
        'fechaNacimiento',
        [sequelize.literal("tipoCredito.name"), "tipodeCreditoNombre"],
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
        isDeleted: 0
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
      isDeleted: 1
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



