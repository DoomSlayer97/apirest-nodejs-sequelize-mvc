const { Router } = require("express");
const routes = Router();

const apiRoutes = require("./api.router");

//middlewares
const jwtAuthMiddleware = require("../middleware/jwtAuth.middleware");

const usuarioController = require("../controllers/usuario.controller");

const apiRoutesMiddlewares = [
  jwtAuthMiddleware
];

routes.post("/auth", usuarioController.auth);

routes.use("/usuarios/", apiRoutesMiddlewares, apiRoutes.usuariosRoutes);
routes.use("/clientes/", apiRoutesMiddlewares ,apiRoutes.clientesRoutes);
routes.use("/actividades/", apiRoutesMiddlewares, apiRoutes.actividadesRoutes);
routes.use("/comentarios/", apiRoutesMiddlewares, apiRoutes.comentariosRoutes);
routes.use("/tiposcreditos/", apiRoutesMiddlewares, apiRoutes.tipoCreditoRoutes);
routes.use("/proyectos/", apiRoutesMiddlewares, apiRoutes.proyectoRoutes);
routes.use("/etapas/", apiRoutesMiddlewares, apiRoutes.etapaRoutes);
routes.use("/clasificaciones/", apiRoutesMiddlewares, apiRoutes.clasificacionRoutes);

module.exports = routes;

