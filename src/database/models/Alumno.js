module.exports = (sequelize, DataTypes) => {
    let alias = "Alumno"
    let cols = {
        idalumno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dni: {
            type: DataTypes.STRING(15)
        },
        email: {
            type: DataTypes.STRING(200),
            defaultValue: null
        },
        celular: {
            type: DataTypes.STRING(15),
            defaultValue: null
        },
        apellido: {
            type: DataTypes.STRING(100),
            defaultValue: null
        },
        nombre: {
            type: DataTypes.STRING(100),
            defaultValue: null
        },
        legajo: {
            type: DataTypes.STRING(45),
            defaultValue: null
        },
        direccion: {
            type: DataTypes.STRING(100),
            defaultValue: null
        },
        fk_idcurso_alumno: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        fk_idtutor_alumno: {
            type: DataTypes.INTEGER,
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
        tableName: "alumnos",
        timestamps: true
    }
    const Alumno = sequelize.define(alias, cols, config)

    Alumno.associate = function (models) {
        Alumno.belongsTo(models.Curso, {
            as: "Curso",
            foreignKey: "fk_idcurso_alumno"
        })

        Alumno.belongsTo(models.Tutor, {
            as: "Tutor",
            foreignKey: "fk_idtutor_alumno"
        })

        Alumno.hasMany(models.Nota, {
            as: "Nota",
            foreignKey: "fk_idalumno_nota"
        })

        Alumno.hasMany(models.Profesor_Alumno, {
            as: "Profesor_Alumno",
            foreignKey: "fk_idalumno_profesoralumno"
        })
    }

    return Alumno
}