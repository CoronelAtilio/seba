const express = require("express");
const router = express.Router();
const path = require('path')

const indexControllers = require(path.resolve(__dirname,"../controllers/indexControllers"));

//RUTAS

// http://localhost:4000/
router.get("/", indexControllers.acceso)
router.post("/", indexControllers.accesoVerificacion)

// http://localhost:4000/welcome
router.get("/welcome",indexControllers.bienvenida)

module.exports = router;
