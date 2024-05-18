const db = require('../database/models')

module.exports = {
    admin: (req, res) => {
            res.render('admin/admin')
    }
}