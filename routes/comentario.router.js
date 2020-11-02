const { Router } = require("express");
const routes = Router();

const {
  create,
  findAll,
  findComentariosRaw
} = require("../controllers/comentario.controller");

routes.post("/", create);
routes.get("/", findAll);
routes.get("/raw", findComentariosRaw);

module.exports = routes;
