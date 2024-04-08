const db = require('../database/models')

module.exports ={
  registro: (req, res) => {
    res.render("usuario/registro");
  },
  acceso: (req, res) => {
    res.render("usuario/acceso");
  },
}