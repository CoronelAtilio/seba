module.exports = (sequelize, DataTypes) => {
    let alias = "Vista_Profesor"
    let cols = {
        apellido_profesor: {
            type: DataTypes.STRING(100)
        },
        nombre_profesor: {
            type: DataTypes.STRING(100)
        },
        celular_profesor: {
            type: DataTypes.STRING(15)
        },
        nombre_cargo: {
            type: DataTypes.STRING(45)
        },
        condicion: {
            type: DataTypes.STRING(15)
        }
    }
    let config = {
        tableName: "vista_profesores",
        timestamps: false
    }
    const Vista_Profesor = sequelize.define(alias, cols, config)

    return Vista_Profesor
}