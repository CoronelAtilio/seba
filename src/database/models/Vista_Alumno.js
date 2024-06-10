module.exports = (sequelize, DataTypes) => {
    let alias = "Vista_Alumno"
    let cols = {
        DNI: {
            type: DataTypes.STRING(15)
        },
        Apellido: {
            type: DataTypes.STRING(100)
        },
        Nombre: {
            type: DataTypes.STRING(100)
        },
        Correo: {
            type: DataTypes.STRING(100)
        },
    }
    let config = {
        tableName: "vista_alumnos",
        timestamps: false
    }
    const Vista_Alumno = sequelize.define(alias, cols, config)

    return Vista_Alumno
}