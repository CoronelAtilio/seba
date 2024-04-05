const express = require("express");
const router = express.Router();

const usersControllers = require("../controllers/usersControllers");

router.get("/registro", usersControllers.registro);
router.get("/acceso", usersControllers.acceso)

module.exports = router;
