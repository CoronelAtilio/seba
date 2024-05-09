module.exports = (sequelize, DataTypes) => {
    let alias = "Situacion"
    let cols = {
        idsituacion: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        condicion: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
    }
    let config = {
        tableName: "situaciones",
        timestamps: false
    }
    const Situacion = sequelize.define(alias, cols, config)

    Situacion.associate = function(models){
        Situacion.hasMany(models.Profesor, {
            as : "Profesor",
            foreignKey : "fk_idsituacion_profesor"
        })
    }

    return Situacion
}