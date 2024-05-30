const db = require('../database/models');
const { Op } = require('sequelize');

module.exports = {
    index: async (req, res) => {
        try {
            // Aquí ejecuto actualización necesaria
            await db.sequelize.query('ANALYZE TABLE all_tables_values;');

            const tablasCant = await db.Tables_Values.findAll({
                attributes: [
                    ['table_name', 'Tablas'], ['table_rows', 'Cantidades']
                ]
            });
            res.render('directivo/directivo', { tablasCant });

        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }
};