const db = require('../../database/models');
const sequelize = db.sequelize;

const apiIndexControllers = {
    'vista_alumnos': async (req, res) => {
        try {
            const alumnos = await db.Vista_Alumno.findAll({
                attributes: [
                    'apellido_alumno',
                    'nombre_alumno',
                    'nombre_tutor',
                    'apellido_tutor',
                    'celular_tutor'
                ]
            });
            return res.status(200).json({
                meta: {
                    status: 200,
                    total: alumnos.length
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
    }
};

module.exports = apiIndexControllers;
