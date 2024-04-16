const express = require("express");
const router = express.Router();
const path = require('path')

const usersControllers = require(path.resolve(__dirname,"../controllers/usersControllers"));

//RUTAS
// http://localhost:4000/usuario/registro
router.get("/registro", usersControllers.registro);

// http://localhost:4000/usuario/acceso
router.get("/acceso", usersControllers.acceso)

module.exports = router;
