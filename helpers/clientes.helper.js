const { Op } = require("sequelize");

module.exports.queryFilter = (req) => {

  const {
    nombre,
    email,
    tel,
    tiposCredito,
    proyectos
  } = req.body;

  let whereDynamic = {
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
  
  if (tiposCredito)
    whereDynamic.tipoCreditoId = {
      [Op.like]: `%${tiposCredito}%`
    };
  
  
  if (tiposCredito)
    whereDynamic.tipoCreditoId = {
      [Op.in]: tiposCredito
    };
  
  if (proyectos)
    whereDynamic.proyectoId = {
      [Op.in]: proyectos
    };
  
  return whereDynamic;

}

