const device_controller = require('../device/controller.js');
const hash = require('../../middleware/hash/hash.js');
const regEx = require('../../middleware/regEx/regEx.js');


module.exports = {
    async login(req, res, db) {
        var { email, password, device } = req.body;

        // Check if user exists
        db.query(`SELECT * FROM User WHERE email = '${email}'`, (err, result) => {
            if (err) throw err

            // if exist
            if(result.length > 0){

                // Check if password is correct
                if(hash.verifyPassword(password, result[0].password, result[0].salt)){

                    // Create device
                    device_controller.newDevice(result[0].email, device, db);
                    return res.json(result);
                }else{
                    return res.json({error: 'Contraseña incorrecta'});
                }

            // if not exist
            }else{
                return res.json({error: 'El usuario no existe'});
            }
        });
    },

    async register(req, res, db) {
        var { email, password, phone, photo } = req.body;



        if(regEx.validateEmail(email) && regEx.validatePassword(password) && regEx.validatePhone(phone)){

            // Hash password
            let hashedPassword = hash.hashPassword(password);
            let salt = hashedPassword.salt;
            password = hashedPassword.hash;

            var result = {
                success: false,
                error: ''
            };

            // Check if user exists
            db.query(`SELECT * FROM User WHERE email = '${email}'`, (err, data) => {
                if (err) throw err
                if(data.length > 0){
                    result.error = 'El usuario ya existe';
                    return res.json(result);
                }else{

                    // Check if phone exists
                    db.query(`SELECT * FROM User WHERE phone = '${phone}'`, (err,data) => {
                        if (err) throw err
                        if(data.length > 0){
                            result.error = 'El teléfono ya existe';
                            return res.json(result);
                        }{

                            // Insert user
                            db.query(`INSERT INTO User (admin, email, password, phone, salt) VALUES (0,'${email}', '${password}', '${phone}', '${salt}')`, (err) => {
                                if (err) throw err
                                result.success = true;
                                return res.json(result);
                            });
                        }
                    });
                }
            });

        }else if(!regEx.validateEmail(email)){
            return res.json({error: 'El email no es válido'});
        }else if(!regEx.validatePassword(password)){
            return res.json({error: 'La contraseña no es válida'});
        }else if(!regEx.validatePhone(phone)){
            return res.json({error: 'El teléfono no es válido'});
        }
    },

    selectUserByEmail(email,db) {
        db.query(`SELECT * FROM User WHERE email = '${email}'`, (err, result) => {
            if (err) throw err
            if(result.length > 0){
                return result;
            }else{
                return null;
            }
        });
    },

    async update(req, res, db) {
        var { user } = req.body;

        // result to send
        var result = {
            success: false,
            error: ''
        };

        // // for users thats created before this update
        // if (user.creation_date == "") {
        //     user.creation_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        // }

        // Check if user_name exists
        db.query(`SELECT * FROM User WHERE user_name = '${user.user_name}'`, (err, data) => {
            if (err) {
                result.error = 'Ha ocurrido un error';
                return res.json(result);
            }
            if (data.length > 0) {
                if (data[0].email != user.email) {
                    result.error = 'El nombre de usuario ya existe';
                    return res.json(result);
                }
            }
        });

        // Check if user exists
        db.query(`SELECT * FROM User WHERE email = '${user.email}'`, (err, data) => {
            if (err) {
                result.error = 'Ha ocurrido un error';
                return res.json(result);
            }
            if (data.length > 0) {

                // Update user
                db.query(`UPDATE User SET phone = '${user.phone}', name = '${user.name}', user_name = '${user.user_name}', age = '${user.age}', position = '${user.position}', category = '${user.category}', dni = '${user.dni}', years_played = '${user.years_played}', experience = '${user.experience}', club = '${user.club}' WHERE email = '${user.email}'`, (err) => {
                    if (err) {
                        result.error = 'Ha ocurrido un error';
                        return res.json(result);
                    }
                    result.success = true;
                    return res.json(result);
                });
            } else {
                result.error = 'El usuario no existe, porfavor, inicie sesión de nuevo';
                return res.json(result);
            }
        });
    }
}