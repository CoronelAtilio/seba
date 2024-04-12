module.exports = (sequelize, DataTypes) => {
    let alias = "Profesor_Curso"
    let cols = {
        idprofesor_curso: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fk_idprofesor_profesorcurso :{
            type: DataTypes.INTEGER,
            defaultValue : null
        },
        fk_idcurso_profesorcurso :{
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
        tableName: "profesores_cursos",
        timestamps: true
    }
    const Profesor_Curso = sequelize.define(alias, cols, config)

    Profesor_Curso.associate = function(models){
        Profesor_Curso.belongsTo(models.Profesor, {
            as : "Profesor",
            foreignKey : "fk_idprofesor_profesorcurso"
        })

        Profesor_Curso.belongsTo(models.Curso, {
            as : "Curso",
            foreignKey : "fk_idcurso_profesorcurso"
        })

    }

    return Profesor_Curso
}