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
                if (rememberMe) {
                    res.cookie('userSession', loginUser, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
                }else{
                    res.cookie('userSession', loginUser, { httpOnly: true });
                }

                req.session.userLogged = {
                    usuario: loginUser,
                    rol: user.Rol.permisos
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
            await db.sequelize.query('ANALYZE TABLE all_tables_values;');

            const tablasCant = await db.Tables_Values.findAll({
                attributes: [
                    ['table_name', 'Tablas'], ['table_rows', 'Cantidades']
                ]
            });
            res.render('index/bienvenida', { tablasCant });

        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    },
    bienvenidaSearch: async (req, res) => {
        try {
            await db.sequelize.query('ANALYZE TABLE all_tables_values;');

            const search = req.query.search || '';

            // Consulta con búsqueda (like)
            const tablasCant = await db.Tables_Values.findAll({
                attributes: [
                    ['table_name', 'Tablas'], ['table_rows', 'Cantidades']
                ],
                where: {
                    table_name: {
                        [Op.like]: `%${search}%`
                    }
                }
            });

            res.render('index/bienvenida', { tablasCant });

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
