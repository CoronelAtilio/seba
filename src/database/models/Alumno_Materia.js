module.exports = (sequelize, DataTypes) => {
    let alias = "Alumno_Materia"
    let cols = {
        idalumno_materia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fk_idalumno_alumnomateria :{
            type: DataTypes.INTEGER,
            defaultValue : null
        },
        fk_idmateria_alumnomateria :{
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
        tableName: "alumnos_materias",
        timestamps: true
    }
    const Alumno_Materia = sequelize.define(alias, cols, config)

    Alumno_Materia.associate = function(models){
        Alumno_Materia.belongsTo(models.Alumno, {
            as : "Alumno",
            foreignKey : "fk_idalumno_alumnomateria"
        })

        Alumno_Materia.belongsTo(models.Materia, {
            as : "Materia",
            foreignKey : "fk_idmateria_alumnomateria"
        })

    }

    return Alumno_Materia
}