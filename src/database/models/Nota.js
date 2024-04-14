module.exports = (sequelize, DataTypes) => {
    let alias = "Nota"
    let cols = {
        idnota: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nota1: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue : null
        },
        nota2: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue : null
        },
        fk_idmateria_nota :{
            type: DataTypes.INTEGER,
            defaultValue : null
        },
        fk_idalumno_nota :{
            type: DataTypes.INTEGER,
            defaultValue : null
        },
        fk_idprofesor_nota :{
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
        tableName: "notas",
        timestamps: true
    }
    const Nota = sequelize.define(alias, cols, config)

    Nota.associate = function(models){
        Nota.belongsTo(models.Materia, {
            as : "Materia",
            foreignKey : "fk_idmateria_nota"
        })

        Nota.belongsTo(models.Alumno, {
            as : "Alumno",
            foreignKey : "fk_idalumno_nota"
        })

        Nota.belongsTo(models.Profesor, {
            as : "Profesor",
            foreignKey : "fk_idprofesor_nota"
        })
    }

    return Nota
}