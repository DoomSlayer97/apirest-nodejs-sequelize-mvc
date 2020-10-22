const { Router } = require("express");
const routes = Router();

const {
  create,
  findAll,
  findOne,
  updateOne,
  deleteOne,
  findAllFilter,
  generateSheetDocument
} = require("../controllers/cliente.controller");

routes.post("/", create);
routes.get("/", findAll);
routes.get("/filter", findAllFilter);
routes.get("/:id", findOne);
routes.put("/:id", updateOne);
routes.delete("/:id", deleteOne);

routes.get("/excel/generate", generateSheetDocument);

module.exports = routes;

