const { Router } = require("express");
const routes = Router();

const {
  create,
  findAll,
  findOne,
  updateOne,
  deleteOne,
  findAllFilter,
  generateSheetDocument,
  generateThousandRegs
} = require("../controllers/cliente.controller");

routes.post("/", create);
routes.post("/generate", generateThousandRegs)
routes.get("/", findAll);
routes.post("/filter", findAllFilter);
routes.get("/:id", findOne);
routes.put("/:id", updateOne);
routes.delete("/:id", deleteOne);

routes.get("/excel/generate", generateSheetDocument);

module.exports = routes;

