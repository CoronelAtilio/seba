const db = require('../database/models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

module.exports = {
    acceso: (req, res) => {
        res.render("index/acceso");
    },
    accesoVerificacion: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("index/acceso", {
                errors: errors.mapped(),
                old: req.body,
            });
        }

        const { loginUser, loginPass, rememberMe } = req.body;

        try {
            const user = await db.Usuario.findOne({
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

            if (!user) {
                return res.render("index/acceso", {
                    errors: { loginUser: { msg: 'Usuario no encontrado' } },
                    old: req.body,
                });
            } else if (user.password_usuario != loginPass) {
                return res.render("index/acceso", {
                    errors: { loginPass: { msg: 'Contraseña incorrecta' } },
                    old: req.body,
                });
            } else {
                let expiresAt = null;

                if (rememberMe) {
                    expiresAt = Date.now() + 1000 * 60 * 3; // 3 minutos
                }

                req.session.userLogged = {
                    usuario: loginUser,
                    rol: user.Rol.permisos,
                    expiresAt: expiresAt
                };

                return res.redirect('/welcome');
            }
        } catch (error) {
            console.log(error.message);
            res.send(error.message);
        }
    },
    bienvenida: async (req, res) => {
        try {
            res.render('index/bienvenida');
        } catch (error) {
            console.log(error.message);
            res.send(error.message);
        }
    }
};
