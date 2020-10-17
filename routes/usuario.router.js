const { Router } = require("express");
const routes = Router();

const {
  create,
  findAll,
  findOne,
  updateOne,
  deleteOne
} = require("../controllers/usuario.controller")

routes.post("/", create);
routes.get("/", findAll);
routes.get("/:id", findOne);
routes.put("/:id", updateOne);
routes.delete("/:id", deleteOne);


module.exports = routes;

