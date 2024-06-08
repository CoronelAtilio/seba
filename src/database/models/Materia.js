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
        },
        fk_idcurso_materia :{
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue : null
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    }
    let config = {
        tableName: "materias"
    }
    const Materia = sequelize.define(alias, cols, config)

    Materia.associate = function(models){
        Materia.belongsTo(models.Curso, {
            as : "Curso",
            foreignKey : "fk_idcurso_materia"
        })

        Materia.hasMany(models.Profesor_Materia, {
            as : "Profesor_Materia",
            foreignKey : "fk_idmateria_profesormateria"
        })

        Materia.hasMany(models.Alumno_Materia, {
            as : "Alumno_Materia",
            foreignKey : "fk_idmateria_alumnomateria"
        })
    }

    return Materia
    }