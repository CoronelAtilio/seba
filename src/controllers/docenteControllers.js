const db = require('../database/models')

module.exports = {
    index: (req, res) => {
        res.render('docente/docente')
    }
};
