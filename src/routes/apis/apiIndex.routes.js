const express = require("express");
const router = express.Router();
const path = require('path')

//direcciones de RUTAS
const apiIndexControllers = require(path.resolve(__dirname,"../../controllers/apis/index.js"));

//RUTAS
// http://localhost:4000/api/index
router.get('/',apiIndexControllers.vista_alumnos)


module.exports = router;
