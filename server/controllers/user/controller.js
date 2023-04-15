const hash = require('../../middleware/hash/hash.js');
const regEx = require('../../middleware/regEx/regEx.js');

module.exports = {
    async login(req, res, db) {
        var { email, password } = req.body;

        db.query(`SELECT * FROM User WHERE email = '${email}'`, (err, result) => {
            if (err) throw err
            if(result.length > 0){
                if(hash.verifyPassword(password, result[0].password, result[0].salt)){
                    return res.json(result);
                }else{
                    return res.json({error: 'Contraseña incorrecta'});
                }   
            }else{
                return res.json({error: 'El usuario no existe'});
            }
        });
    },

    async register(req, res, db) {
        var { email, password, phone } = req.body;

        if(regEx.validateEmail(email) && regEx.validatePassword(password) && regEx.validatePhone(phone)){
            let hashedPassword = hash.hashPassword(password);
            let salt = hashedPassword.salt;
            password = hashedPassword.hash;
    
            db.query(`INSERT INTO User (email, password, phone, salt) VALUES ('${email}', '${password}', '${phone}', '${salt}')`, (err, result) => {
                if (err) throw err
                return res.json(result);
            });
        }else if(!regEx.validateEmail(email)){
            return res.json({error: 'El email no es válido'});
        }else if(!regEx.validatePassword(password)){
            return res.json({error: 'La contraseña no es válida'});
        }else if(!regEx.validatePhone(phone)){
            return res.json({error: 'El teléfono no es válido'});
        }
    }
}