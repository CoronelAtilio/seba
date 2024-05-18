const express = require("express");
const router = express.Router();
const path = require('path')

const docenteControllers = require(path.resolve(__dirname,"../controllers/docenteControllers"));

//RUTAS

// http://localhost:4000/preceptor
router.get("/", docenteControllers.index);

module.exports = router;
