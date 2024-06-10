module.exports = (sequelize, DataTypes) => {
    let alias = "Vista_Profesor"
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
        tableName: "vista_profesores",
        timestamps: false
    }
    const Vista_Profesor = sequelize.define(alias, cols, config)

    return Vista_Profesor
}