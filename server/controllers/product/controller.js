const device_controller = require('../device/controller.js');
const hash = require('../../middleware/hash/hash.js');
const regEx = require('../../middleware/regEx/regEx.js');
const fs = require('fs');
const path = require('path');
const { edit, getById } = require('../match/controller.js');


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

        db.query(`INSERT INTO Product (name, price, description, category, path) VALUES ('${req.body.name}', '${req.body.price}', '${req.body.description}', '${req.body.category}', 'uploads/${req.file.filename}')`, (err, data) => {
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

    async addSizes(req, res, db) {
        result = {
            success: false,
            error: '',
            data: []
        }
        var sizes = req.body.sizes;
        var id = req.body.id;

        db.query(`INSERT INTO ProductSize (id_product, xs, s, m, l, xl, 2xl) VALUES ('${id}', '${sizes[0].stock}', '${sizes[1].stock}', '${sizes[2].stock}', '${sizes[3].stock}','${sizes[4].stock}', '${sizes[5].stock}')`, (err, data) => {
            if (err){
                result.error = 'Ha ocurrido un error';
                return res.json(result);
            }
            else{
                result.success = true;
                result.data = data;
                return res.json(result);
            }
        }
        );

    },

    async edit(req, res, db) {
        result = {
            success: false,
            error: '',
            data: []
        }

        let product = req.body;
        let image = req.file;

        if(image){
            db.query(`UPDATE Product SET name = '${product.name}', price = '${product.price}', description = '${product.description}', category = '${product.category}', path = 'uploads/${req.file.filename}' WHERE id = '${product.id}'`, (err, data) => {
                if (err){
                    result.error = 'Ha ocurrido un error';
                    return res.json(result);
                }
                else{
                    result.success = true;
                    result.data = data;
                    return res.json(result);
                }
            }
            );
        }else{
            db.query(`UPDATE Product SET name = '${product.name}', price = '${product.price}', description = '${product.description}', category = '${product.category}' WHERE id = '${product.id}'`, (err, data) => {
                if (err){
                    result.error = 'Ha ocurrido un error';
                    return res.json(result);
                }
                else{
                    result.success = true;
                    result.data = data;
                    return res.json(result);
                }
            }
            );
        }
    },

    async editSizes(req, res, db) {
        result = {
            success: false,
            error: '',
            data: []
        }

        let sizes = req.body.sizes;
        let id = req.body.id;

        db.query(`UPDATE ProductSize SET xs = '${sizes[0].stock}', s = '${sizes[1].stock}', m = '${sizes[2].stock}', l = '${sizes[3].stock}', xl = '${sizes[4].stock}', 2xl = '${sizes[5].stock}' WHERE id_product = '${id}'`, (err, data) => {
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

    async delete(req, res, db) {
        result = {
            success: false,
            error: '',
            data: []
        }

        let product = req.body.product;

        fs.unlink(product.path, (err) => {
            if (err) {
                result.error = 'Ha ocurrido un error';
                return res.json(result);
            }
        });

        db.query(`DELETE FROM Product WHERE id = '${product.id}'`, (err, data) => {
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

    async getByCategory(req, res, db) {
        result = {
            success: false,
            error: '',
            data: []
        }

        let category = req.body.category;

        db.query(`SELECT * FROM Product WHERE category = '${category}'`, (err, data) => {
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

    async getSize(req, res, db) {
        result = {
            success: false,
            error: '',
            data: []
        }

        product = req.body.product;

        db.query(`SELECT xs,s,m,l,xl,2xl FROM ProductSize WHERE id_product = '${product.id}'`, (err, data) => {
            if (err){
                result.error = 'Ha ocurrido un error';
                return res.json(result);
            }
            else{
                result.success = true;
                if(data.length > 0){
                    var arr = Object.keys(data[0]).map(key => ({ size:key, stock: data[0][key] }));
                    result.data = arr;
                }else{
                    result.data = {
                        'xs': -1,
                        's': -1,
                        'm': -1,
                        'l': -1,
                        'xl': -1,
                        '2xl': -1
                    };
                }
                return res.json(result);
            }
        });
    },

    async getByUser(req, res, db) {
        result = {
            success: false,
            error: '',
            data: []
        }

        let email = req.body.user;

        db.query(`SELECT * FROM BookProduct WHERE user_email = '${email}'`, (err, data) => {
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

    async getById(req, res, db) {
        result = {
            success: false,
            error: '',
            data: []
        }

        let id = req.body.id;

        db.query(`SELECT * FROM Product WHERE id = '${id}'`, (err, data) => {
            if (err){
                result.error = 'Ha ocurrido un error';
                return res.json(result);
            }
            else{
                if(data.length > 0){
                    result.success = true;
                    result.data = data[0];
                    return res.json(result);
                }else{
                    result.error = 'No se ha encontrado el producto';
                    return res.json(result);
                }
            }
        });
    },

    async getImage(req, res, db) {
        result = {
            success: false,
            error: '',
            data: []
        }

        let image = req.body.image;

        let new_image = image.split('/')[1] + '.' + image.split('/')[2]

        const folderPath = 'uploads'; 

        fs.readdir(folderPath, (err, files) => {
            if (err) {
                result.error = error;
                return res.json(result);
            }
            return res.sendFile(path.join(__dirname, `../../uploads/${new_image}`));
        });

    },

    async bookProduct(req, res, db) {
        result = {
            success: false,
            error: '',
            data: []
        }

        let product = req.body.product;
        let size = req.body.size;
        let stock = req.body.stock;
        let user = req.body.user;

        db.query(`UPDATE ProductSize SET ${size} = ${stock} - 1 WHERE id_product = '${product.id}'`, (err, data) => {
            if (err){
                result.error = 'Ha ocurrido un error 1';
                return res.json(result);
            }
            else{
                db.query(`INSERT INTO BookProduct (user_email, id_product, size) VALUES ('${user}','${product.id}', '${size}')`, (err, data) => {
                    if (err){
                        result.error = 'Ha ocurrido un error 2';
                        return res.json(result);
                    }
                    else{
                        result.success = true;
                        result.data = data;
                        return res.json(result);
                    }
                });
            }
        }
        );
    },
}