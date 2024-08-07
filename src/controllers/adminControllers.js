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
            const { nombre_usuario, password_usuario, password_usuario2, permisos, dni_profesor } = req.body;

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

            // Verificación de existencia de profesoor
            const profesorBuscado = await db.Profesor.findOne({
                where: { dni_profesor }
            });

            if (!profesorBuscado) {
                errorsObj.dni_profesor = { msg: 'Este Docente no existe en la BD' };
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
                fk_idcargo_usuario: cargo.idcargo,
                fk_idprofesor_usuario: profesorBuscado.idprofesor
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
            if (!errors.isEmpty()) {
                return res.render('admin/usuario', {
                    errors2: errors.mapped(),
                    old2: req.body,
                });
            }
    
            let { apellido_profesor, nombre_profesor, fecha_nac_profesor, email_profesor, celular_profesor, nombre_cargo, dni_profesor, condicion, nombre_materia } = req.body;
            email_profesor = email_profesor.toLowerCase();
            let errorsObj = {};
    
            const docenteExistente = await db.Profesor.findOne({
                attributes: ['dni_profesor', 'email_profesor', 'celular_profesor'],
                where: {
                    [Op.or]: [
                        { dni_profesor: dni_profesor },
                        { email_profesor: email_profesor },
                        { celular_profesor: celular_profesor }
                    ]
                }
            });
    
            // Verificar campos únicos
            if (docenteExistente) {
                if (docenteExistente.dni_profesor === dni_profesor) {
                    errorsObj.dni_profesor = { msg: 'Este DNI ya existe' };
                }
                if (docenteExistente.email_profesor === email_profesor) {
                    errorsObj.email_profesor = { msg: 'Este Email ya Existe' };
                }
                if (docenteExistente.celular_profesor === celular_profesor) {
                    errorsObj.celular_profesor = { msg: 'Este Celular ya Existe' };
                }
            }
    
            if (Object.keys(errorsObj).length > 0) {
                return res.render('admin/usuario', {
                    errors2: errorsObj,
                    old2: req.body,
                });
            }
    
            // Promesas para buscar cargo, situación y materia
            const cargoPromise = db.Cargo.findOne({ where: { nombre_cargo } });
            const situacionPromise = db.Situacion.findOne({ where: { condicion: condicion } });
            const materiaPromise = db.Materia.findOne({ where: { nombre_materia } });
    
            // Esperar a que todas las promesas se resuelvan
            const [cargo, situacion, materia] = await Promise.all([cargoPromise, situacionPromise, materiaPromise]);
    
            // Verificación de existencia de cargo, situación y materia
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
    
            if (!materia) {
                errorsObj.nombre_materia = { msg: 'Materia no encontrada' };
                return res.render('admin/usuario', {
                    errors2: errorsObj,
                    old2: req.body,
                });
            }
    
            // Crear el profesor y obtener el nuevo ID
            const nuevoDocente = await db.Profesor.create({
                apellido_profesor,
                nombre_profesor,
                fecha_nac_profesor,
                email_profesor,
                celular_profesor,
                dni_profesor,
                fk_idcargo_profesor: cargo.idcargo,
                fk_idsituacion_profesor: situacion.idsituacion
            });
    
            // Crear la relación en la tabla Profesor_Materia
            await db.Profesor_Materia.create({
                fk_idprofesor_profesormateria: nuevoDocente.idprofesor,
                fk_idmateria_profesormateria: materia.idmateria
            });
    
            // Redirección tras la creación exitosa
            res.redirect('/administrador/usuario');
    
        } catch (error) {
            console.log(error.message);
            res.send(error.message);
        }
    },
    crear_alu_tut: async (req, res) => {
        try {
            // Validar errores en la solicitud
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('admin/usuario', {
                    errors3: errors.mapped(),
                    old3: req.body,
                });
            }
    
            // Extraer y convertir a minúsculas los campos del cuerpo de la solicitud
            let { 
                apellido_alumno, nombre_alumno, fecha_nac_alumno, email_alumno, 
                celular_alumno, direccion_alumno, dni_alumno, genero_alumno, 
                apellido_tutor, nombre_tutor, email_tutor, celular_tutor, 
                direccion_tutor, dni_tutor 
            } = req.body;
    
            email_alumno = email_alumno.toLowerCase();
            genero_alumno = genero_alumno.toLowerCase();
            email_tutor = email_tutor.toLowerCase();
    
            let errorsObj = {};
    
            // Buscar alumno existente por campos únicos
            const alumno = await db.Alumno.findOne({
                attributes: ['dni_alumno', 'email_alumno', 'celular_alumno'],
                where: {
                    [Op.or]: [
                        { dni_alumno: dni_alumno },
                        { email_alumno: email_alumno },
                        { celular_alumno: celular_alumno }
                    ]
                }
            });
    
            // Verificar si el alumno ya existe y agregar errores
            if (alumno) {
                if (alumno.dni_alumno === dni_alumno) {
                    errorsObj.dni_alumno = { msg: 'Este DNI ya existe' };
                }
                if (alumno.email_alumno === email_alumno) {
                    errorsObj.email_alumno = { msg: 'Este Email ya Existe' };
                }
                if (alumno.celular_alumno === celular_alumno) {
                    errorsObj.celular_alumno = { msg: 'Este Celular ya Existe' };
                }
            }
    
            if (Object.keys(errorsObj).length > 0) {
                return res.render('admin/usuario', {
                    errors3: errorsObj,
                    old3: req.body,
                });
            }
    
            // Buscar género
            const genero = await db.Genero.findOne({
                where: { tipo: genero_alumno }
            });
    
            if (!genero) {
                errorsObj.genero_alumno = { msg: 'Género no encontrado' };
                return res.render('admin/usuario', {
                    errors3: errorsObj,
                    old3: req.body,
                });
            }
    
            // Buscar o crear tutor
            let tutor = await db.Tutor.findOne({ where: { dni_tutor } });
            let idNuevoTutor = null;
    
            if (!tutor && dni_tutor) {
                const tutorTemp = await db.Tutor.create({
                    apellido_tutor,
                    nombre_tutor,
                    email_tutor,
                    celular_tutor,
                    direccion_tutor,
                    dni_tutor
                });
                idNuevoTutor = tutorTemp.idtutor;
            }
    
            // Crear alumno
            await db.Alumno.create({
                apellido_alumno,
                nombre_alumno,
                fecha_nac_alumno,
                email_alumno,
                celular_alumno,
                direccion_alumno,
                dni_alumno,
                fk_idgenero_alumno: genero.idgenero,
                fk_idtutor_alumno: tutor ? tutor.idtutor : idNuevoTutor
            });
    
            // Redireccionar tras la creación exitosa
            res.redirect('/administrador/usuario');
    
        } catch (error) {
            console.error("Error al crear el alumno y tutor:", error);
            res.status(500).send('Ocurrió un error al crear el alumno y tutor.');
        }
    },
    modificarUser: async (req, res) => {
        try {
            let alumnos = await db.Alumno.findAll()
            let profesores =  await db.Profesor.findAll()
            let usuarios = await db.Usuario.findAll()
            res.render('admin/modificar/modificar',{alumnos,profesores,usuarios})
        } catch (error) {
            console.error("Error modificar:", error);
            res.status(500).send('Ocurrió un error.');
        }
    },
    eliminarUser: async (req, res) => {
        try {
            let idusuario = req.params.idusuario
            await db.Usuario.destroy({
                where: {
                    idusuario
                }
            })
            res.redirect('/administrador/usuario/modificar')
        } catch (error) {
            console.error("Error :", error);
            res.status(500).send('Ocurrió un error.');
        }
    },
    eliminarDocente: async (req, res) => {
        try {
            let idprofesor = req.params.idprofesor
            // Busca el registro del profesor
    let profesor = await db.Profesor.findByPk(idprofesor);

            if (profesor) {
                // Elimina todas las referencias en la tabla profesores_materias
                await db.Profesor_Materia.destroy({
                    where: { fk_idprofesor_profesormateria: idprofesor }
                });
        
                // Elimina todas las referencias en la tabla usuarios
                await db.Usuario.destroy({
                    where: { fk_idprofesor_usuario: idprofesor }
                });
        
                // Elimina el profesor
                await db.Profesor.destroy({
                    where: { idprofesor }
                });
        
            } 
            res.redirect('/administrador/usuario/modificar')
        } catch (error) {
            console.error("Error :", error);
            res.status(500).send('Ocurrió un error.');
        }
    },
    eliminarAlumno: async (req, res) => {
        try {
            let idalumno = req.params.idalumno
            // Busca el registro del profesor
    let alumno = await db.Alumno.findByPk(idalumno);

            if (alumno) {
                // // Elimina todas las referencias en la tabla profesores_materias
                // await db.Profesor_Materia.destroy({
                //     where: { fk_idprofesor_profesormateria: idprofesor }
                // });
        
                // // Elimina todas las referencias en la tabla usuarios
                // await db.Usuario.destroy({
                //     where: { fk_idprofesor_usuario: idprofesor }
                // });
        
                // Elimina el alumno
                await db.Alumno.destroy({
                    where: { idalumno }
                });
        
            } 
            res.redirect('/administrador/usuario/modificar')
        } catch (error) {
            console.error("Error :", error);
            res.status(500).send('Ocurrió un error.');
        }
    },
    modificarUserOne: async (req, res) => {
        try {
            let idusuario = req.params.idusuario
            let usuario = await db.Usuario.findByPk(idusuario)

            res.render('admin/modificar/modificarUsuario',{usuario})
        } catch (error) {
            console.error("Error modificar:", error);
            res.status(500).send('Ocurrió un error.');
        }
    },
    modificarDocenteOne: async (req, res) => {
        try {
            let idprofesor = req.params.idprofesor
            let docente = await db.Profesor.findByPk(idprofesor)

            res.render('admin/modificar/modificarDocente',{docente})
        } catch (error) {
            console.error("Error modificar:", error);
            res.status(500).send('Ocurrió un error.');
        }
    },
    modificarAlumnoOne: async (req, res) => {
        try {
            let idalumno = req.params.idalumno
            let alumno = await db.Alumno.findByPk(idalumno)

            res.render('admin/modificar/modificarAlumno',{alumno})
        } catch (error) {
            console.error("Error modificar:", error);
            res.status(500).send('Ocurrió un error.');
        }
    }
}