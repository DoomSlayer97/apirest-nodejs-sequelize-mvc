const { Router } = require("express");
const routes = Router();

const {
  create,
  findAll,
  findOne,
  update,
  deleteOne
} = require("../controllers/clasificacion.controller");

routes.post("/", create);
routes.get("/", findAll);
routes.get("/:id", findOne);
routes.put("/:id", update);
routes.delete("/:id", deleteOne);

module.exports = routes;


