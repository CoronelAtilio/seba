const express = require("express");
const router = express.Router();

//direcciones de RUTAS
const adminControllers = require("../controllers/adminControllers");

//RUTAS
http://localhost:4000/admin
router.get('/',adminControllers.admin)


module.exports = router;
