const { Router } = require("express");
const routes = Router();

const {
  create,
  findAll
} = require("../controllers/comentario.controller");

routes.post("/", create);
routes.get("/", findAll);

module.exports = routes;
