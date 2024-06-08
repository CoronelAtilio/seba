module.exports = (sequelize, DataTypes) => {
    let alias = "Nota"
    let cols = {
        idnota: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_nota: {
            type: DataTypes.STRING(15),
            allowNull: false
        }
    }
    let config = {
        tableName: "notas",
        timestamps: false
    }
    const Nota = sequelize.define(alias, cols, config)

    Nota.associate = function(models){

        Nota.hasMany(models.Al_Mat_Not_Cur, {
            as : "Al_Mat_Not_Curs",
            foreignKey : "fk_idalumno_almatnotcur"
        })

    }

    return Nota
}