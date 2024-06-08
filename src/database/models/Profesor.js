module.exports = (sequelize, DataTypes) => {
    let alias = "Profesor"
    let cols = {
        idprofesor: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        dni_profesor: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true
        },
        email_profesor: {
            type: DataTypes.STRING(100),
            defaultValue : null,
            unique: true
        },
        celular_profesor: {
            type: DataTypes.STRING(15),
            defaultValue : null,
            unique: true
        },
        apellido_profesor: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        nombre_profesor: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        fk_idcargo_profesor :{
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue : null
        },
        fk_idsituacion_profesor :{
            type: DataTypes.INTEGER.UNSIGNED,
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
        tableName : "profesores",
        timestamps: true
    }
    const Profesor = sequelize.define(alias, cols, config)

    Profesor.associate = function(models){
        Profesor.belongsTo(models.Cargo, {
            as : "Cargo",
            foreignKey : "fk_idcargo_profesor"
        })

        Profesor.belongsTo(models.Situacion, {
            as : "Situacion",
            foreignKey : "fk_idsituacion_profesor"
        })

        Profesor.hasMany(models.Profesor_Materia, {
            as : "Profesores_Materias",
            foreignKey : "fk_idprofesor_profesormateria"
        })
    }

    return Profesor
    }