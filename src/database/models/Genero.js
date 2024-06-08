module.exports = (sequelize, DataTypes) => {
    let alias = "Genero"
    let cols = {
        idgenero: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        tipo: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
    }
    let config = {
        tableName: "generos",
        timestamps: false
    }
    const Genero = sequelize.define(alias, cols, config)

    Genero.associate = function(models){
        Genero.hasMany(models.Alumno, {
            as : "Alumnos",
            foreignKey : "fk_idgenero_alumno"
        })
    }

    return Genero
}