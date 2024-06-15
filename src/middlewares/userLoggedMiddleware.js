const db = require('../database/models');

async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    try {
        // Primero verifica si la sesión ya tiene el usuario logueado
        if (req.session && req.session.userLogged) {
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged;
        } else if (req.cookies.userSession) {
            // Si no hay usuario logueado en la sesión, verifica la cookie
            const usuarioCookie = await db.Usuario.findOne({
                include: [{
                    model: db.Cargo,
                    as: 'Cargo',
                    attributes: ['nombre_cargo']
                }],
                where: {
                    nombre_usuario: req.cookies.userSession
                }
            });

            // Si se encuentra el usuario en la base de datos, almacena la información en la sesión
            if (usuarioCookie) {
                req.session.userLogged = {
                    usuario: usuarioCookie.nombre_usuario,
                    rol: usuarioCookie.Cargo.nombre_cargo
                };
                res.locals.isLogged = true;
                res.locals.userLogged = req.session.userLogged;
            }
        }
    } catch (error) {
        console.error("Error al verificar el usuario:", error);
    }

    next();
};

module.exports = userLoggedMiddleware;
