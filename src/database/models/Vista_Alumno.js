module.exports = (sequelize, DataTypes) => {
    let alias = "Vista_Alumno"
    let cols = {
        dni_alumno: {
            type: DataTypes.STRING(15)
        },
        nombre_alumno: {
            type: DataTypes.STRING(100)
        },
        apellido_alumno: {
            type: DataTypes.STRING(100)
        },
        anio_curso: {
            type: DataTypes.STRING(15)
        },
        division_curso: {
            type: DataTypes.STRING(15)
        },
        turno_curso: {
            type: DataTypes.STRING(15)
        }
    }
    let config = {
        tableName: "vista_alumnos",
        timestamps: false
    }
    const Vista_Alumno = sequelize.define(alias, cols, config)

    return Vista_Alumno
}