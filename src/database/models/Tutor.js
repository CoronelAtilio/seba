module.exports = (sequelize, DataTypes) => {
    let alias = "Tutor"
    let cols = {
        idtutor: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dni: {
            type: DataTypes.STRING(15)
        },
        email: {
            type: DataTypes.STRING(200),
            defaultValue : null
        },
        celular: {
            type: DataTypes.STRING(15),
            defaultValue : null
        },
        apellido: {
            type: DataTypes.STRING(100),
            defaultValue : null
        },
        nombre: {
            type: DataTypes.STRING(100),
            defaultValue : null
        },
        direccion: {
            type: DataTypes.STRING(100),
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
        tableName: "tutores",
        timestamps: true
    }
    const Tutor = sequelize.define(alias, cols, config)

    Tutor.associate = function(models){
        Tutor.hasMany(models.Alumno, {
            as : "Alumno",
            foreignKey : "fk_idtutor_alumno"
        })
    }

    return Tutor
}