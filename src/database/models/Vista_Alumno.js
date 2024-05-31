module.exports = (sequelize, DataTypes) => {
    let alias = "Vista_Alumno"
    let cols = {
        apellido_alumno: {
            type: DataTypes.STRING(100)
        },
        nombre_alumno: {
            type: DataTypes.STRING(100)
        },
        nombre_tutor: {
            type: DataTypes.STRING(100)
        },
        apellido_tutor: {
            type: DataTypes.STRING(100)
        },
        celular_tutor: {
            type: DataTypes.STRING(15)
        },
    }
    let config = {
        tableName: "vista_alumnos",
        timestamps: false
    }
    const Vista_Alumno = sequelize.define(alias, cols, config)

    return Vista_Alumno
}