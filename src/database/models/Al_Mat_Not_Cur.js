module.exports = (sequelize, DataTypes) => {
    let alias = "Al_Mat_Not_Cur"
    let cols = {
        idal_mat_not_cur: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        fk_idmateria_almatnotcur :{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        fk_idnota_almatnotcur :{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        fk_idalumno_almatnotcur :{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        fk_idcurso_almatnotcur :{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        valor_nota: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        obs: {
            type: DataTypes.STRING(255),
            defaultValue: null
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
        tableName: "al_mat_not_cur",
        timestamps: true
    }
    const Al_Mat_Not_Cur = sequelize.define(alias, cols, config)

    Al_Mat_Not_Cur.associate = function(models){
        Al_Mat_Not_Cur.belongsTo(models.Materia, {
            as : "Materia",
            foreignKey : "fk_idmateria_almatnotcur"
        })

        Al_Mat_Not_Cur.belongsTo(models.Nota, {
            as : "Nota",
            foreignKey : "fk_idnota_almatnotcur"
        })

        Al_Mat_Not_Cur.belongsTo(models.Alumno, {
            as : "Alumno",
            foreignKey : "fk_idalumno_almatnotcur"
        })

        Al_Mat_Not_Cur.belongsTo(models.Curso, {
            as : "Curso",
            foreignKey : "fk_idcurso_almatnotcur"
        })

    }

    return Al_Mat_Not_Cur
}