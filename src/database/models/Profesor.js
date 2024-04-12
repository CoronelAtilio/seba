module.exports = (sequelize, DataTypes) => {
    let alias = "Profesor"
    let cols = {
        idprofesor: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dni: {
            type: DataTypes.STRING(15)
        },
        email: {
            type: DataTypes.STRING(200)
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
        legajo: {
            type: DataTypes.STRING(45),
            defaultValue : null
        },
        password: {
            type: DataTypes.STRING(100),
            defaultValue : null
        },
        fk_idcargo_profesor :{
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
        tableName : "profesores",
        timestamps: true
    }
    const Profesor = sequelize.define(alias, cols, config)

    Profesor.associate = function(models){
        Profesor.belongsTo(models.Cargo, {
            as : "Cargo",
            foreignKey : "fk_idcargo_profesor"
        })
    }

    return Profesor
    }