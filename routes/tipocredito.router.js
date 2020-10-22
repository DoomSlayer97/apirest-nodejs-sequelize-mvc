const { Router } = require("express");
const routes = Router();

const {
  create,
} = require("../controllers/tipocredito.controller")

routes.post("/", create);


module.exports = routes;

