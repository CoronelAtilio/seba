const db = require('../database/models')
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');
const { where } = require('sequelize');

module.exports = {
    admin: (req, res) => {
        res.render('admin/usuario')
    },
    crear_usuario: async (req, res) => {
        try {
            const errors = validationResult(req);
            let errorsObj = errors.mapped();
            console.log(errorsObj);
            const { nombre_usuario, password_usuario, password_usuario2, permisos } = req.body
            if (password_usuario !== password_usuario2) {
                errorsObj.password_usuario2 = { msg: 'No Coinciden Contraseñas' };
            }
            let usuarioBuscado = await db.Usuario.findOne({
                where: {
                    nombre_usuario: nombre_usuario
                }
            })
            if (usuarioBuscado) {
                errorsObj.nombre_usuario = { msg: 'Este usuario ya Existe' };
            }

            if (Object.keys(errorsObj).length > 0) {
                return res.render('admin/usuario', {
                    errors1: errorsObj,
                    old1: req.body,
                });
            }

            let rol = await db.Rol.findOne({
                where: {
                    permisos: permisos.toLowerCase()
                }
            });

            db.Usuario.create({
                password_usuario: bcrypt.hashSync(password_usuario, 10),
                nombre_usuario: nombre_usuario,
                fk_idrol_usuario : rol.id
            })
            res.redirect('/administrador/usuario');

        } catch (error) {
            console.log(error.message);
            res.send(error.message);
        }
    }
}