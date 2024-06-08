module.exports = (sequelize, DataTypes) => {
    let alias = "Curso"
    let cols = {
        idcurso: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        tipo: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
    }
    let config = {
        tableName: "cursos",
        timestamps: false
    }
    const Curso = sequelize.define(alias, cols, config)

    Curso.associate = function(models){
        Curso.hasMany(models.Materia, {
            as : "Materia",
            foreignKey : "fk_idcurso_materia"
        })
    }

    return Curso
}