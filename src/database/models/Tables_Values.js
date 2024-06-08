module.exports = (sequelize, DataTypes) => {
    let alias = "Tables_Values"
    let cols = {
        table_name: {
            type: DataTypes.STRING(64)
        },
        table_rows: {
            type: DataTypes.INTEGER(21)
        },
    }
    let config = {
        tableName: "all_tables_values",
        timestamps: false
    }
    const Tables_Values = sequelize.define(alias, cols, config)

    return Tables_Values
}