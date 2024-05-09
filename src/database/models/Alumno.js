module.exports = (sequelize, DataTypes) => {
    let alias = "Alumno"
    let cols = {
        idalumno: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        dni_alumno: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true
        },
        email_alumno: {
            type: DataTypes.STRING(100),
            defaultValue: null,
            unique: true
        },
        celular_alumno: {
            type: DataTypes.STRING(15),
            defaultValue: null,
            unique: true
        },
        apellido_alumno: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        nombre_alumno: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        direccion_alumno: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        fecha_nac: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fk_idtutor_alumno: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: null
        },
        fk_idgenero_alumno: {
            type: DataTypes.INTEGER.UNSIGNED,
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
        Alumno.belongsTo(models.Genero, {
            as: "Genero",
            foreignKey: "fk_idgenero_alumno"
        })

        Alumno.belongsTo(models.Tutor, {
            as: "Tutor",
            foreignKey: "fk_idtutor_alumno"
        })

        Alumno.hasMany(models.Nota, {
            as: "Nota",
            foreignKey: "fk_idalumno_nota"
        })

        Alumno.hasMany(models.Alumno_Materia, {
            as : "Alumno_Materia",
            foreignKey : "fk_idalumno_alumnomateria"
        })
    }

    return Alumno
}