const express = require("express");
const router = express.Router();
const path = require('path')

//direcciones de RUTAS
const adminControllers = require(path.resolve(__dirname,"../controllers/adminControllers"));

//middlewares
const userValidationMiddleware = require(path.resolve(__dirname, "../middlewares/userValidationMiddleware.js"))

//RUTAS
// http://localhost:4000/administrador/usuario
router.get('/usuario',adminControllers.admin)

//CRUD
// http://localhost:4000/administrador/crear/usuario
router.post('/crear/usuario',userValidationMiddleware,adminControllers.crear_usuario)


module.exports = router;
