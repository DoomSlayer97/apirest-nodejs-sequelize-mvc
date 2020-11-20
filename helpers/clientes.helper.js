const { Op, literal } = require("sequelize");
const sequelize = require("sequelize");
const {
  Clasificacion,
  Etapa
} = require("../models");

module.exports.queryFilter = async (req) => {

  const {
    nombre,
    email,
    tel,
    tiposCredito,
    proyectos,
    clasificaciones,
    etapas
  } = req.body;

  let whereDynamic = {
    isDeleted: false
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
      ), { [Op.like]: `%${nombre}%` },
    ); 
  
  if (email)
    whereDynamic.email = {
      [Op.like]: `%${email}%`
    }
  
  if (tel)
    whereDynamic.tel = {
      [Op.like]: `%${tel}%`
    };
  
  if (tiposCredito)
    whereDynamic.tipoCreditoId = tiposCredito;
  
  if (proyectos)
    whereDynamic.proyectoId = proyectos;
  
  /* if (etapas) {

    let clasificacionesFiltro = [];

    const findedEtapas = await Clasificacion.findAll({
      where: {
        etapaId: etapas
      }
    });

    clasificacionesFiltro = findedEtapas.map(item => item.id);

    if (clasificaciones) {

      clasificacionesFiltro = clasificacionesFiltro.concat(clasificaciones);

    }

    whereDynamic.clasificacionId = {
      [Op.in]: clasificacionesFiltro
    };
    
  } */


  return whereDynamic;

}


