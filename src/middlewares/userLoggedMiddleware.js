const db = require('../database/models');

async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;
    try {
        if (req.cookies.userSession) {

            const usuarioCookie = await db.Usuario.findOne({
                include: [{
                    model: db.Rol,
                    as: 'Rol',
                    attributes: ['permisos']
                }],
                where: {
                    nombre_usuario: req.cookies.userSession
                }
            });
            
            if (usuarioCookie) {
                req.session.userLogged = {
                    usuario: usuarioCookie.nombre_usuario,
                    rol: usuarioCookie.Rol.permisos
                }
            }
        }

        if (req.session && req.session.userLogged) {
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged;
        }

    } catch (error) {
        console.error("Error al verificar el usuario:", error);
    }
    next();
};
module.exports = userLoggedMiddleware;