const db = require('../database/models')
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

module.exports = {
    admin: (req, res) => {
        res.render('admin/usuario')
    },
    crear_usuario: async (req, res) => {
        try {
            const errors = validationResult(req);
            let errorsObj = errors.mapped();
            const { nombre_usuario, password_usuario, password_usuario2, permisos } = req.body;

            // Verificación de contraseñas
            if (password_usuario !== password_usuario2) {
                errorsObj.password_usuario2 = { msg: 'No Coinciden Contraseñas' };
            }

            // Verificación de existencia de usuario
            const usuarioBuscado = await db.Usuario.findOne({
                where: { nombre_usuario }
            });

            if (usuarioBuscado) {
                errorsObj.nombre_usuario = { msg: 'Este usuario ya Existe' };
            }

            // Retorno de errores si existen
            if (Object.keys(errorsObj).length > 0) {
                return res.render('admin/usuario', {
                    errors1: errorsObj,
                    old1: req.body,
                });
            }

            // Búsqueda de cargo y creación de usuario de manera asíncrona
            const cargoPromise = db.Cargo.findOne({
                where: { nombre_cargo: permisos.toLowerCase() }
            });

            const hashedPasswordPromise = bcrypt.hash(password_usuario, 10);

            const [cargo, hashedPassword] = await Promise.all([cargoPromise, hashedPasswordPromise]);

            if (!cargo) {
                errorsObj.nombre_cargo = { msg: 'Cargo no encontrado' };
                return res.render('admin/usuario', {
                    errors1: errorsObj,
                    old1: req.body,
                });
            }

            await db.Usuario.create({
                password_usuario: hashedPassword,
                nombre_usuario,
                fk_idcargo_usuario: cargo.idcargo
            });

            // Redirección tras la creación exitosa
            res.redirect('/administrador/usuario');

        } catch (error) {
            console.log(error.message);
            res.status(500).send('Error del servidor: ' + error.message);
        }
    },
    crear_docente: async (req, res) => {
        try {
            const errors = validationResult(req);
            const { apellido_profesor, nombre_profesor, fecha_nac_profesor, email_profesor, celular_profesor, nombre_cargo, dni_profesor, condicion } = req.body
            console.log(apellido_profesor, nombre_profesor, fecha_nac_profesor, email_profesor, celular_profesor, nombre_cargo, dni_profesor, condicion );
            let errorsObj = errors.mapped();

            const docente = await db.Profesor.findOne({
                attributes: ['dni_profesor', 'email_profesor', 'celular_profesor'],
                where: {
                    [Op.or]: [
                        { dni_profesor: dni_profesor },
                        { email_profesor: email_profesor },
                        { celular_profesor: celular_profesor }
                    ]
                }
            });
            //Verifico campos unicos
            if (docente) {
                if (docente.dni_profesor === dni_profesor) {
                    errorsObj.dni_profesor = { msg: 'Este DNI ya existe' };
                }
                if (docente.email_profesor === email_profesor) {
                    errorsObj.email_profesor = { msg: 'Este Email ya Existe' };
                }
                if (docente.celular_profesor === celular_profesor) {
                    errorsObj.celular_profesor = { msg: 'Este Celular ya Existe' };
                }                
            }

            if (Object.keys(errorsObj).length > 0) {
                return res.render('admin/usuario', {
                    errors2: errorsObj,
                    old2: req.body,
                });
            }



// Promesas para buscar cargo y situación
const cargoPromise = db.Cargo.findOne({
    where: { nombre_cargo }
});

const situacionPromise = db.Situacion.findOne({
    where: { condicion: condicion }
});

// Esperar a que ambas promesas se resuelvan
const [cargo, situacion] = await Promise.all([cargoPromise, situacionPromise]);

// Verificación de existencia de cargo y situación
if (!cargo) {
    errorsObj.nombre_cargo = { msg: 'Cargo no encontrado' };
    return res.render('admin/usuario', {
        errors2: errorsObj,
        old2: req.body,
    });
}

if (!situacion) {
    errorsObj.condicion = { msg: 'Situacion no encontrada' };
    return res.render('admin/usuario', {
        errors2: errorsObj,
        old2: req.body,
    });
}

// Crear el profesor
await db.Profesor.create({
    apellido_profesor, 
    nombre_profesor, 
    fecha_nac_profesor, 
    email_profesor, 
    celular_profesor, 
    dni_profesor,
    fk_idcargo_profesor: cargo.idcargo, 
    fk_idsituacion_profesor: situacion.idsituacion
});

// Redirección tras la creación exitosa
res.redirect('/administrador/usuario');

        } catch (error) {
            console.log(error.message);
            res.send(error.message);
        }
    }
}