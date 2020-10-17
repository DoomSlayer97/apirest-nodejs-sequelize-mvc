const { Router } = require("express");
const routes = Router();

const apiRoutes = require("./api.router");

//middlewares
const jwtAuthMiddleware = require("../middleware/jwtAuth.middleware");

const usuarioController = require("../controllers/usuario.controller");

routes.post("/auth", usuarioController.auth);

routes.use("/usuarios/", jwtAuthMiddleware, apiRoutes.usuariosRoutes);
routes.use("/clientes/", jwtAuthMiddleware, apiRoutes.clientesRoutes);
routes.use("/actividades/", jwtAuthMiddleware, apiRoutes.actividadesRoutes);
routes.use("/comentarios/", jwtAuthMiddleware, apiRoutes.comentariosRoutes);

module.exports = routes;

