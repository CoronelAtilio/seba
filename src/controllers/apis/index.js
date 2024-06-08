const db = require('../../database/models');
const sequelize = db.sequelize;

const apiIndexControllers = {
    'vista_alumnos': async (req, res) => {
        // await sequelize.query('ANALYZE TABLE vista_alumnos;');
        try {
            const alumnos = await db.Vista_Alumno.findAll({
                attributes: [
                    ['dni_alumno','dni'],
                    ['nombre_alumno','nombre'],
                    ['apellido_alumno','apellido'],
                    ['anio_curso','año'],
                    ['division_curso','division'],
                    ['turno_curso','turno']
                ],
                limit: 400
            });
            return res.status(200).json({
                meta: {
                    status: 200,
                    total: alumnos.length,
                    table_name: "Alumnos"
                },
                data: alumnos,
            });
        } catch (error) {
            return res.status(500).json({
                meta: {
                    status: 500,
                    message: error.message
                }
            });
        }
    },
    'vista_profesores': async (req, res) => {
        await sequelize.query('ANALYZE TABLE vista_profesores;');
        try {
            const profesores = await db.Vista_Profesor.findAll({
                attributes: [
                    'dni_profesor',
                    'apellido_profesor',
                    'nombre_profesor',
                    'nombre_cargo',
                    'condicion',
                    'nombre_materia'
                ]
            });
            return res.status(200).json({
                meta: {
                    status: 200,
                    total: profesores.length,
                    table_name: "Profesores"
                },
                data: profesores,
            });
        } catch (error) {
            return res.status(500).json({
                meta: {
                    status: 500,
                    message: error.message
                }
            });
        }
    }
};

module.exports = apiIndexControllers;
