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

        console.log(req.file);
        console.log(req.body.name);

        db.query(`INSERT INTO Product (name, price, description, category, path) VALUES ('${req.body.name}', '${req.body.price}', '${req.body.description}', '${req.body.category}', '${req.file.path}')`, (err, data) => {
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
    }
}