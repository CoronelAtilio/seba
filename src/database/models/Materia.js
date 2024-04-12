module.exports = (sequelize, DataTypes) => {
    let alias = "Materia"
    let cols = {
        idmateria: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(100)
        },
        fk_idcurso_materia :{
            type: DataTypes.INTEGER,
            defaultValue : null
        }
    }
    let config = {
        tableName: "materias",
        timestamps: false
    }
    const Materia = sequelize.define(alias, cols, config)

    Materia.associate = function(models){
        Materia.belongsTo(models.Curso, {
            as : "Curso",
            foreignKey : "fk_idcurso_materia"
        })
    }

    return Materia
    }