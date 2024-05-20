const express = require("express");
const router = express.Router();
const path = require('path')

//Importaciones
const indexControllers = require(path.resolve(__dirname,"../controllers/indexControllers"));
const loginMiddleware = require(path.resolve(__dirname,"../middlewares/loginMiddleware"))

//RUTAS

// http://localhost:4000/
router.get("/", indexControllers.acceso)
router.post("/", loginMiddleware,indexControllers.accesoVerificacion)

// http://localhost:4000/welcome
router.get("/welcome",indexControllers.bienvenida)

module.exports = router;
