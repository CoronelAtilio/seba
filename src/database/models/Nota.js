module.exports = (sequelize, DataTypes) => {
    let alias = "Nota"
    let cols = {
        idnota: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        nota1: {
            type: DataTypes.DECIMAL(2,2),
            defaultValue : null
        },
        nota2: {
            type: DataTypes.DECIMAL(2,2),
            defaultValue : null
        },
        nota_final: {
            type: DataTypes.DECIMAL(2,2),
            defaultValue : null
        },
        fk_idalumno_nota :{
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
        tableName: "notas",
        timestamps: true
    }
    const Nota = sequelize.define(alias, cols, config)

    Nota.associate = function(models){

        Nota.belongsTo(models.Alumno, {
            as : "Alumno",
            foreignKey : "fk_idalumno_nota"
        })

    }

    return Nota
}