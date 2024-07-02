module.exports = (sequelize, DataTypes) => {
    let alias = "Materia"
    let cols = {
        idmateria: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_materia: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }
    let config = {
        tableName: "materias",
        timestamps: false
    }
    const Materia = sequelize.define(alias, cols, config)

    Materia.associate = function(models){

        Materia.hasMany(models.Profesor_Materia, {
            as : "Profesores_Materias",
            foreignKey : "fk_idmateria_profesormateria"
        })

        Materia.hasMany(models.Al_Mat_Not_Cur, {
            as : "Al_Mat_Not_Curs",
            foreignKey : "fk_idmateria_almatnotcur"
        })
    }

    return Materia
    }