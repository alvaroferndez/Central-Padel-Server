const device_controller = require('../device/controller.js');
const hash = require('../../middleware/hash/hash.js');
const regEx = require('../../middleware/regEx/regEx.js');


module.exports = {
    async login(req, res, db) {
        var { email, password, device } = req.body;

        // Check if user exists
        db.query(`SELECT * FROM user WHERE email = '${email}'`, (err, result) => {
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
            db.query(`SELECT * FROM user WHERE email = '${email}'`, (err, data) => {
                if (err) throw err
                if(data.length > 0){
                    result.error = 'El usuario ya existe';
                    return res.json(result);
                }else{

                    // Check if phone exists
                    db.query(`SELECT * FROM user WHERE phone = '${phone}'`, (err,data) => {
                        if (err) throw err
                        if(data.length > 0){
                            result.error = 'El teléfono ya existe';
                            return res.json(result);
                        }{

                            // Insert user
                            db.query(`INSERT INTO user (admin, email, password, phone, salt) VALUES (0,'${email}', '${password}', '${phone}', '${salt}')`, (err) => {
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

    async uploadImage(req, res, db) {
        console.log(req.body);

        var result = {
            success: false,
            error: ''
        };

        res.json(result);
    },
    
    async getUserByEmail(req, res, db) {
        var { email } = req.body;

        var result = {
            success: false,
            error: '',
            data: []
        }

        db.query(`SELECT * FROM user WHERE email = '${email}'`, (err, data) => {
            if (err){
                result.error = err;
                return res.json(result);
            }else{
                if(data.length > 0){
                    result.success = true;
                    result.data = data;
                    return res.json(result);
                }else{
                    result.error = 'El usuario no existe';
                    return res.json(result);
                }
            }
        });
    },

    async getAll(req, res, db) {
        result = {
            success: false,
            error: '',
            data: []
        }

        db.query(`SELECT * FROM user`, (err, data) => {
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

    async update(req, res, db) {
        var user = undefined
        if(req.body.user){
            user = req.body.user;
        }else{
            user = req.body;
        }

        // result to send
        var result = {
            success: false,
            error: ''
        };

        db.query(`SELECT * FROM user WHERE user_name = '${user.user_name}'`, (err, data) => {
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
        db.query(`SELECT * FROM user WHERE email = '${user.email}'`, (err, data) => {
            if (err) {
                result.error = 'Ha ocurrido un error';
                return res.json(result);
            }
            if (data.length > 0) {

                // Update user
                if(req.file != undefined){
                    db.query(`UPDATE user SET phone = '${user.phone}', name = '${user.name}', user_name = '${user.user_name}', age = '${user.age}', path = 'uploads/${req.file.filename}', position = '${user.position}', category = '${user.category}', dni = '${user.dni}', years_played = '${user.years_played}', experience = '${user.experience}', club = '${user.club}' WHERE email = '${user.email}'`, (err) => {
                        if (err) {
                            result.error = 'Ha ocurrido un error';
                            return res.json(result);
                        }
                        result.success = true;
                        return res.json(result);
                    });
                }else{
                    db.query(`UPDATE user SET phone = '${user.phone}', name = '${user.name}', user_name = '${user.user_name}', age = '${user.age}', position = '${user.position}', category = '${user.category}', dni = '${user.dni}', years_played = '${user.years_played}', experience = '${user.experience}', club = '${user.club}' WHERE email = '${user.email}'`, (err) => {
                        if (err) {
                            result.error = 'Ha ocurrido un error';
                            return res.json(result);
                        }
                        result.success = true;
                        return res.json(result);
                    });
                }
                
            } else {
                result.error = 'El usuario no existe, porfavor, inicie sesión de nuevo';
                return res.json(result);
            }
        });
    },

    async delete(req, res, db) {
        var { email } = req.body;

        console.log(email)

        // result to send
        var result = {
            success: false,
            error: ''
        };

        var sql = `DELETE userdevice SET email_user = '' WHERE email_user = '${email}'`;

        db.query(sql, (err) => {
            if (err) {
                result.error = 'Ha ocurrido un error';
                return res.json(result);
            }else{
                sql = `UPDATE usermatch WHERE email_user = '${email}'`;

                db.query(sql, (err) => {
                    if (err) {
                        result.error = 'Ha ocurrido un error';
                        return res.json(result);
                    }else{
                        sql = `DELETE FROM user WHERE email = '${email}'`;

                        db.query(sql, (err) => {
                            if (err) {
                                result.error = 'Ha ocurrido un error';
                                return res.json(result);
                            }
                            console.log(1)
                            result.success = true;
                            return res.json(result);
                        });
                    }
                });
            }
        });
    }
}