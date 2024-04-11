module.exports = (sequelize, DataTypes) => {
    let alias = "Profesor_Alumno"
    let cols = {
        idprofesor_alumno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fk_idprofesor_profesoralumno :{
            type: DataTypes.INTEGER,
            defaultValue : null
        },
        fk_idalumno_profesoralumno :{
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
        tableName: "profesores_alumnos",
        timestamps: true
    }
    const Profesor_Alumno = sequelize.define(alias, cols, config)

    Profesor_Alumno.associate = function(models){
        Profesor_Alumno.belongsTo(models.Profesor, {
            as : "Profesor",
            foreignKey : "fk_idprofesor_profesoralumno"
        })

        Profesor_Alumno.belongsTo(models.Alumno, {
            as : "Alumno",
            foreignKey : "fk_idalumno_profesoralumno"
        })

    }

    return Profesor_Alumno
}