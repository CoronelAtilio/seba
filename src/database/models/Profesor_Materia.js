module.exports = (sequelize, DataTypes) => {
    let alias = "Profesor_Materia"
    let cols = {
        idprofesor_materia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fk_idmateria_profesormateria :{
            type: DataTypes.INTEGER,
            defaultValue : null
        },
        fk_idprofesor_profesormateria :{
            type: DataTypes.INTEGER,
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
        tableName: "profesores_materias",
        timestamps: true
    }
    const Profesor_Materia = sequelize.define(alias, cols, config)

    Profesor_Materia.associate = function(models){
        Profesor_Materia.belongsTo(models.Profesor, {
            as : "Profesor",
            foreignKey : "fk_idprofesor_profesormateria"
        })

        Profesor_Materia.belongsTo(models.Materia, {
            as : "Materia",
            foreignKey : "fk_idmateria_profesormateria"
        })

    }

    return Profesor_Materia
}