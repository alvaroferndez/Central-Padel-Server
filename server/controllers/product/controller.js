const device_controller = require('../device/controller.js');
const hash = require('../../middleware/hash/hash.js');
const regEx = require('../../middleware/regEx/regEx.js');
const fs = require('fs');
const path = require('path');


module.exports = {

    async getAll(req, res, db) {
        result = {
            success: false,
            error: '',
            data: []
        }

        db.query(`SELECT * FROM Product`, (err, data) => {
            if (err){
                result.error = 'Ha ocurrido un error';
                return res.json(result);
            }
            else{
                result.success = true;
                result.data = data;
                return res.json(result);
            }
        });
    },

    async add(req, res, db) {
        result = {
            success: false,
            error: '',
            data: []
        }
        var carpetaFotos = path.join(__dirname, 'uploads/shop');
        var product = req.body;
        var rutaArchivo = path.join(carpetaFotos, product.image.new_name);

        fs.writeFileSync(rutaArchivo, product.image.data, 'base64');
        // db.query(`INSERT INTO Product (name, price, description, category, images) VALUES ('${product.name}', '${product.price}', '${product.description}', '${product.category}', '${product.images}')`, (err, data) => {
        //     if (err){
        //         result.error = 'Ha ocurrido un error';
        //         return res.json(result);
        //     }
        //     else{
        //         result.success = true;
        //         result.data = data;
        //         return res.json(result);
        //     }
        // });
    }
}