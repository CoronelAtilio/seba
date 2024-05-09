const db = require('../database/models')

module.exports = {
    admin: (req, res) => {
        res.render('admin/admin')
    },
    // buscar: async (req, res) => {
    //     try {
    //         const { name_inputsearch } = req.query;
    //         const producto = await db.Producto.findAll({
    //             where: {
    //                 marca: {
    //                     [Op.like]: `%${buscar}%`
    //                 }
    //             }
    //         });
    //         res.render('admin/adminProductos', { productos: producto });
    //     } catch (error) {
    //         console.log(error.message);
    //         res.send(error.message);
    //     }
    // },
}