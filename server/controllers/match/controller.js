const usermatch = require('../usermatch/controller');

function convertedDate(date) {
    var date_split = date.split('/');
    var new_date = new Date(date_split[2], date_split[1], date_split[0]);
    return new_date;
}

module.exports = {

    // add match whitout players
    async add(req, res, db) {

        // match whitout players
        var match = req.body.match

        // response object
        var result = {
            success: false,
            error: ''
        }

        var sql = `SELECT * FROM Matchs WHERE date = '${match.date}' AND hour = '${match.hour}' AND id_court = '${match.court}'`

        db.query(sql, (err, data) => {
            if (err) {
                result.error = err;
                return res.json(result)
            } else {

                // if match exists
                if (data.length > 0) {
                    result.error = 'Ya existe un partido en esa pista a esa hora';
                    return res.json(result)
                }else{

                    // if match not exists
                    sql = `INSERT INTO Matchs (date, hour, id_court) VALUES ('${match.date}', '${match.hour}', '${match.court}')`
                    db.query(sql, (err, data) => {
                        if (err) {
                            // if error of the server
                            result.error = err;
                            return res.json(result)
                        } else {
                            // if match added, in the table usermatchs don't add players
                            result.success = true;
                            return res.json(result)
                        }
                    })
                }
            }
        });
    },

    // delete match
    async delete(req, res, db) {
        // id match
        var id_match = req.body.id_match

        // response object
        var result = {
            success: false,
            error: ''
        }

        // delete all players of the table usermatch, because id_match is a foreign key
        sql = `DELETE FROM UserMatch WHERE id_match = '${id_match}'`

        db.query(sql, (err, data) => {
            if (err) {
                // if error of the server
                result.error = err;
                return res.json(result)
            } else {  
                // delete match
                sql = `DELETE FROM Matchs WHERE id = '${id_match}'`

                db.query(sql, (err, data) => {
                    if (err) {
                        // if error of the server
                        result.error = err;
                        return res.json(result)
                    } else {
                        // if match deleted
                        result.success = true;
                        return res.json(result)
                    }
                });
            }
        });
    },

    async edit(req, res, db) {
        var match = req.body.match

        var result = {
            success: false,
            error: '',
        }
        var sql = `SELECT * FROM Matchs WHERE date = '${match.date}' AND hour = '${match.hour}' AND id_court = '${match.court}'`

        db.query(sql, (err, data) => {
            if (err){
                result.error = err;
                return res.json(result)
            }else{
                if (data.length > 0) {
                    sql = `SELECT * FROM UserMatch WHERE id_match = '${match.id}'`;

                    db.query(sql, (err, data) => {
                        if(err){
                            result.error = err;
                            return res.json(result)
                        }else if(data.length > 0){
                            let checked = false;

                            for(let i = 0; i < data.length; i++){
                                if(data[i].email_user != match.players[i].email){
                                    checked = true;
                                }
                            }
                            if(checked){
                                usermatch.updateMatch(match, res, db);
                            }else{
                                result.error = 'Ya existe un partido en esa pista a esa hora y fecha';
                                return res.json(result)
                            }
                        }else {
                            usermatch.updateMatch(match, res, db);
                        }
                    });
                }else{
                    usermatch.updateMatch(match, res, db);
                }
            }
        });
    },

    async getAll(req, res, db) {
        var {first, last} = req.body;

        var matchs = [];

        var sql = `SELECT * FROM Matchs`

        await db.query(sql, (err, data) => {
            if (err) {
                return res.json(err)
            } else {
                for (let i = 0; i < data.length; i++) {
                    if (convertedDate(data[i].date).getTime() >= convertedDate(first).getTime() && convertedDate(data[i].date).getTime() <= convertedDate(last).getTime()) {
                        let match = {
                            id: data[i].id,
                            date: data[i].date,
                            hour: data[i].hour,
                            court: data[i].id_court,
                            players: [],
                        }
                        matchs.push(match);      
                    }
                }
                return res.json(matchs)
            }
        });
    },

    async getById(req, res, db) {
        var id_match = req.body.id_match;

        var match = {
            id: '',
            date: '',
            hour: '',
            court: '',
            players: [
                {name: '', surname: '', email: '', position: '', username: ''},
                {name: '', surname: '', email: '', position: '', username: ''},
                {name: '', surname: '', email: '', position: '', username: ''},
                {name: '', surname: '', email: '', position: '', username: ''}
            ],
        }

        var sql = `SELECT * FROM Matchs WHERE id = '${id_match}'`

        await db.query(sql, (err, data) => {
            if (err) {
                return res.json(err)
            } else {
                match.id = data[0].id;
                match.date = data[0].date;
                match.hour = data[0].hour;
                match.court = data[0].id_court;
                // usermatch.getPlayers(match, res, db);
                return res.json(match);
            }
        });
    }
}