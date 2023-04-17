const user_device_controller = require('../userdevice/controller');

module.exports = {
    newDevice(email_user, name_device, db) {

        // Check if device exists
        db.query(`SELECT * FROM Device WHERE name = '${name_device}'`, (err, data) => {
            if (err) throw err
            if (data.length == 0) {
                db.query(`INSERT INTO Device (name) VALUES ('${name_device}')`);
            }
            user_device_controller.insertUserDevice(email_user, name_device, db);
        });
    }
}