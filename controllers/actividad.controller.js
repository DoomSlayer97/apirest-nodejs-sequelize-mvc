const { Actividad } = require("../models");
const validatorjs = require("validatorjs");

const {
  verificarTipoActividad,
  verificarTipoValidacion
} = require("../helpers/actividad.helper");
const { Op, literal } = require("sequelize");

module.exports.crearActividad = async (req, res) => {

  try {
    
    const {
      titulo,
      tipo,
      fecha,
      fechaFin,
      hora,
      horaFin,
      comentario,
      clienteId
    } = req.body;
     
    const insertData = verificarTipoActividad(tipo, {
      tipo,
      titulo,
      fecha,
      fechaFin,
      hora,
      horaFin,
      comentario,
      clienteId
    });

    const validator = new validatorjs(insertData, verificarTipoValidacion(tipo));

    if (validator.fails()) return res.status(500).json({
      message: "invalid_params",
      errors: validator.errors.errors
    });

    insertData.usuarioId = req.body.userAuth.id;
    insertData.comentario = req.body.comentario;

    const actividad = await Actividad.create(insertData);

    return res.json({
      message: "created",
      actividad
    });


  } catch (e) {
    
    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });

  }

}

module.exports.findCalendarioActividades = async (req, res) => {

  try {

    const {
      tipos
    } = req.body;

    const authUserId = req.body.userAuth.id;

    let queryWhere = {
      usuarioId: authUserId
    };

    if (tipos && tipos.length > 0)
      queryWhere.tipo = {
        [Op.in]: tipos
      };

    const actividades = await Actividad.findAll({
      where: queryWhere,
      attributes: [
        "id",
        "fecha",
        "hora",
        [ literal(`
          CASE 
            WHEN actividad.fecha < curdate() && actividad.conclusion = '' THEN 'omitida' 
            WHEN actividad.conclusion != '' THEN 'realizada'
            ELSE 'pendiente'
          END 
        `), "statusNuevo"]
      ]
    });

    return res.json({
      actividades
    });
    
  } catch (e) {

    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });

    
  }

}

module.exports.actualizarActividad = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      titulo,
      tipo,
      fecha,
      fechaFin,
      hora,
      horaFin,
      comentario,
      conclusion,
      clienteId
    } = req.body;
     
    const insertData = verificarTipoActividad(tipo, {
      tipo,
      titulo,
      fecha,
      fechaFin,
      hora,
      horaFin,
      comentario,
      clienteId
    });

    const validator = new validatorjs(insertData, verificarTipoValidacion(tipo));

    if (validator.fails()) return res.status(500).json({
      message: "invalid_params",
      errors: validator.errors.errors
    });

    insertData.usuarioId = req.body.userAuth.id;

    if(conclusion)
      insertData.conclusion = conclusion;

    const isUpdated = await Actividad.update(insertData, {
      where: { id }
    });
    
    if (!isUpdated) return res.status(500).json({
      message: "failed_update"
    });

    const updatedActividad = await Actividad.findOne({ where: { id } });

    return res.status(201).json({
      message: "updated",
      updated: updatedActividad
    })
    
  } catch (e) {
    
    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });

  }

}
