const express = require("express");
const router = express.Router();
const path = require('path')

const cursoControllers = require(path.resolve(__dirname,"../controllers/cursoControllers"));

//RUTAS

// http://localhost:4000/curso
router.get("/", cursoControllers.index);

// http://localhost:4000/curso/:id
router.get("/:id_curso", cursoControllers.nota_alu);

module.exports = router;
