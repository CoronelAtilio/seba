module.exports = (sequelize, DataTypes) => {
    let alias = "Curso"
    let cols = {
        idcurso: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        anio_curso: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        division_curso: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        turno_curso: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        ciclo_lectivo: {
            type: DataTypes.STRING(4),
            allowNull: false
        },
    }
    let config = {
        tableName: "cursos",
        timestamps: false
    }
    const Curso = sequelize.define(alias, cols, config)

    Curso.associate = function(models){
        Curso.hasMany(models.Al_Mat_Not_Cur, {
            as : "Al_Mat_Not_Curs",
            foreignKey : "fk_idcurso_almatnotcur"
        })
    }

    return Curso
}