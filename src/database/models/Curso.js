module.exports = (sequelize, DataTypes) => {
    let alias = "Curso"
    let cols = {
        idcurso: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(45)
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