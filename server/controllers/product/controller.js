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

    }
}