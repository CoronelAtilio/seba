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
        fk_idcargo_usuario: {
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
        },
        fk_idprofesor_usuario: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: null
        }
    }
    let config = {
        tableName: "usuarios",
        timestamps: true 
    }
    const Usuario = sequelize.define(alias, cols, config)

    Usuario.associate = function(models){
        Usuario.belongsTo(models.Cargo, {
            as: "Cargo",
            foreignKey: "fk_idcargo_usuario"
        })

        Usuario.belongsTo(models.Profesor, {
            as: "Profesor",
            foreignKey: "fk_idprofesor_usuario"
        })
    }

    return Usuario
}
