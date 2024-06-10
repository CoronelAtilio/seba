module.exports = (sequelize, DataTypes) => {
    let alias = "Vista_Usuario"
    let cols = {
        Nombre: {
            type: DataTypes.STRING(100)
        }
    }
    let config = {
        tableName: "vista_usuarios",
        timestamps: false
    }
    const Vista_Usuario = sequelize.define(alias, cols, config)

    return Vista_Usuario
}