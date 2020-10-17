const { Router } = require("express");
const routes = Router();

const { 
  crearActividad,
  findCalendarioActividades,
  actualizarActividad
} = require("../controllers/actividad.controller");

routes.post("/", crearActividad);
routes.post("/find/calendario", findCalendarioActividades);
routes.put("/:id", actualizarActividad);

module.exports = routes;

