const express = require("express");
const router = express.Router();
const path = require('path')

//direcciones de RUTAS
const adminControllers = require(path.resolve(__dirname,"../controllers/adminControllers"));

//RUTAS
// http://localhost:4000/admin
router.get('/',adminControllers.admin)


module.exports = router;
