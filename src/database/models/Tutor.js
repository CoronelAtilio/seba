module.exports = (sequelize, DataTypes) => {
    let alias = "Tutor"
    let cols = {
        idtutor: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        dni_tutor: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        email_tutor: {
            type: DataTypes.STRING(100),
            defaultValue : null
        },
        celular_tutor: {
            type: DataTypes.STRING(15),
            defaultValue : null
        },
        apellido_tutor: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        nombre_tutor: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        direccion_tutor: {
            type: DataTypes.STRING(100),
            allowNull: false
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
        tableName: "tutores",
        timestamps: true
    }
    const Tutor = sequelize.define(alias, cols, config)

    Tutor.associate = function(models){
        Tutor.hasMany(models.Alumno, {
            as : "Alumnos",
            foreignKey : "fk_idtutor_alumno"
        })
    }

    return Tutor
}