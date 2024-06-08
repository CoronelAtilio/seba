module.exports = (sequelize, DataTypes) => {
    let alias = "Vista_Tabla"
    let cols = {
        tablas: {
            type: DataTypes.STRING(64)
        }
    }
    let config = {
        tableName: "vista_tablas",
        timestamps: false
    }
    const Vista_Tabla = sequelize.define(alias, cols, config)

    return Vista_Tabla
}