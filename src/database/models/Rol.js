module.exports = (sequelize, DataTypes) => {
    let alias = "Rol"
    let cols = {
        idrol: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        permisos: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
    }
    let config = {
        tableName: "roles",
        timestamps: false
    }
    const Rol = sequelize.define(alias, cols, config)

    Rol.associate = function(models){
        Rol.hasMany(models.Usuario, {
            as : "Usuario",
            foreignKey : "fk_idrol_usuario"
        })
    }

    return Rol
}