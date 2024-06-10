const db = require('../database/models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");

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
                    model: db.Cargo,
                    as: 'Cargo',
                    attributes: ['nombre_cargo']
                }],
                where: {
                    nombre_usuario: {
                        [Op.like]: `${loginUser}`
                    }
                }
            });

            const passwordMatch = await bcrypt.compare(loginPass, user.password_usuario);
            if (!user) {
                return res.render("index/acceso", {
                    errors: { loginUser: { msg: 'Usuario no encontrado' } },
                    old: req.body,
                });
            } else if (!passwordMatch) {
                return res.render("index/acceso", {
                    errors: { loginPass: { msg: 'Contraseña incorrecta' } },
                    old: req.body,
                });
            } else {
                if (rememberMe) {
                    res.cookie('userSession', loginUser, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
                }else{
                    res.cookie('userSession', loginUser, { httpOnly: true });
                }

                req.session.userLogged = {
                    usuario: loginUser,
                    rol: user.Cargo.nombre_cargo
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
            // Aquí ejecuto actualización necesaria
            await db.sequelize.query('ANALYZE TABLE vista_tablas;');

            const tablas = await db.Vista_Tabla.findAll({
                attributes: [
                    ['tablas', 'Tablas']
                ]
            });
            res.render('index/bienvenida', { tablas });

        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    },
    bienvenidaSearch: async (req, res) => {
        try {
            await db.sequelize.query('ANALYZE TABLE vista_tablas;');

            const search = req.query.search || '';

            // Consulta con búsqueda (like)
            const tablas = await db.Vista_Tabla.findAll({
                attributes: [
                    ['tablas', 'Tablas']
                ],
                where: {
                    tablas: {
                        [Op.like]: `%${search}%`
                    }
                }
            });

            res.render('index/bienvenida', { tablas });

        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    },
    logout: (req, res) => {
        res.clearCookie('userSession');
        req.session.destroy();
        return res.redirect("/");
    }

};
