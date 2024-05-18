const db = require('../database/models')
const { Op } = require('sequelize')

module.exports = {
  acceso: (req, res) => {
    res.render("index/acceso");
  },
  accesoVerificacion: async (req, res) => {
    const { loginUser, loginPass, rememberMe } = req.body;

    req.session.countIntentos = req.session.countIntentos || 1;
    try {
      const user = await db.Usuario.findOne({ //User Puede llegar a ser null
        include: [{
          model: db.Rol,
          as: 'Rol',
          attributes: ['permisos']
        }],
        where: {
          nombre_usuario: {
            [Op.like]: `${loginUser}`
          }
        }
      });
      console.log(user);
      if (user == null && req.session.countIntentos != 3) {  // Analizo si existe usuario y números de intentos
        req.session.countIntentos++;
        return res.send(`intentos restantes ${4-req.session.countIntentos}`);
      } else if (req.session.countIntentos == 3) {
        return res.send('intentos excedidos');
      }else{

      }
    } catch (error) {
      console.log(error.message);
      res.send(error.message);
    }
  }
}