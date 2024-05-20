const db = require('../database/models')
const { Op } = require('sequelize')

module.exports = {
  acceso: (req, res) => {
    res.render("index/acceso");
  },
  accesoVerificacion: async (req, res) => {
    const { loginUser, loginPass, rememberMe } = req.body;

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

      if (!user) {  // Analizo si existe usuario
        return res.send(`usuario ${loginUser} no existe`);
      } else if (user.password_usuario != loginPass) {
        return res.send(`contraseña ${loginPass} incorrecta`)
      } else {
        let expiresAt = null;

        if (rememberMe) {
          expiresAt = Date.now() + 1000 * 60 * 3; // 3 minutos
        }
        req.session.userLogged = {
          usuario: loginUser,
          rol: user.Rol.permisos,
          expiresAt: expiresAt
          //expiresAt es la cookie que voy a usar
        }
        return res.redirect('/welcome')
      }
    } catch (error) {
      console.log(error.message);
      res.send(error.message);
    }
  },
  bienvenida: async(req,res)=>{
    try {
      res.render('index/bienvenida')
    } catch (error) {
      console.log(error.message);
      res.send(error.message);
    }
  }
}