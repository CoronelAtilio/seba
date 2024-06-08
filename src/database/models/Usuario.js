module.exports = (sequelize, DataTypes) => {
    let alias = "Usuario"
    let cols = {
        idusuario: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        password_usuario: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        nombre_usuario: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        fk_idcargo_usuario :{
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
        tableName: "usuarios"
    }
    const Usuario = sequelize.define(alias, cols, config)

    Usuario.associate = function(models){
        Usuario.belongsTo(models.Cargo, {
            as : "Cargo",
            foreignKey : "fk_idcargo_usuario"
        })
    }

    return Usuario
    }