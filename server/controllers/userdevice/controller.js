const user_controller = require('../user/controller');

module.exports = {
    insertUserDevice(email_user, name_device, db) {
        db.query(`INSERT INTO UserDevice (email_user, name_device) VALUES ('${email_user}', '${name_device}')`);
    },

    checkUserLogged(req, res, db) {
        var { email, device } = req.body;
        db.query(`SELECT * FROM UserDevice WHERE email_user = '${email}' AND name_device = '${device}'`, (err, result) => {
            if (err) throw err
            if(result.length > 0){
                // modificar la funcion para que sea una llamada al controlador que se debe encargar de devolver el usuario
                db.query(`SELECT * FROM User WHERE email = '${email}'`, (err, result) => {
                    if (err) throw err
                    if(result.length > 0){
                        result[0].logged = true;
                        return res.json(result[0]);
                    }
                });
                // user_controller.selectUserByEmail(email, db, (result) => {
                //     if(result != null){
                //         result[0].logged = true;
                //         return res.json(result[0]);
                //     }
                // });
            }else{
                return res.json({logged: false});
            }
        });
    }
}