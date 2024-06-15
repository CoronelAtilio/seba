const express = require("express");
const router = express.Router();
const path = require('path')

//direcciones de RUTAS
const adminControllers = require(path.resolve(__dirname,"../controllers/adminControllers"));

//middlewares
const userValidationMiddleware = require(path.resolve(__dirname, "../middlewares/userValidationMiddleware.js"))
const docenteValidationMiddleware = require(path.resolve(__dirname, "../middlewares/docenteValidationMiddleware.js"))
const alu_tutValidationMiddleware = require(path.resolve(__dirname, "../middlewares/alu_tutValidationMiddleware.js"))


//RUTAS
// http://localhost:4000/administrador/usuario
router.get('/usuario',adminControllers.admin)

//CRUD
// http://localhost:4000/administrador/usuario
router.post('/usuario',userValidationMiddleware,adminControllers.crear_usuario)

// http://localhost:4000/administrador/usuario/docente
router.post('/usuario/docente',docenteValidationMiddleware,adminControllers.crear_docente)

// http://localhost:4000/administrador/usuario/alumno
router.post('/usuario/alumno',alu_tutValidationMiddleware,adminControllers.crear_alu_tut)

module.exports = router;
