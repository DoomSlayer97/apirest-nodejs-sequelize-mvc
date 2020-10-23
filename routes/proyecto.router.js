const { Router } = require("express");
const routes = Router();

const {
  create,
} = require("../controllers/proyecto.controller")

routes.post("/", create);


module.exports = routes;
