module.exports = (sequelize, DataTypes) => {
    let alias = "Cargo"
    let cols = {
        idcargo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(45)
        },
    }
    let config = {
        tableName: "cargos",
        timestamps: false
    }
    const Cargo = sequelize.define(alias, cols, config)

    Cargo.associate = function(models){
        Cargo.hasMany(models.Profesor, {
            as : "Profesor",
            foreignKey : "fk_idcargo_profesor"
        })
    }

    return Cargo
}