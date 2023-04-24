const usermatch = require('../usermatch/controller');

module.exports = {
    async add(req, res, db) {
        var match = req.body.match
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
                if (data.length > 0) {
                    result.error = 'Ya existe un partido en esa pista a esa hora';
                    return res.json(result)
                }else{
                    sql = `INSERT INTO Matchs (date, hour, id_court) VALUES ('${match.date}', '${match.hour}', '${match.court}')`
                    db.query(sql, (err, data) => {
                        if (err) {
                            result.error = err;
                            return res.json(result)
                        } else {
                            result.success = true;
                            return res.json(result)
                        }
                    })
                }
            }
        });
    },

    async delete(req, res, db) {
        var id_match = req.body.id_match
        var result = {
            success: false,
            error: ''
        }
        var sql = `DELETE FROM Matchs WHERE id = '${id_match}'`

        db.query(sql, (err, data) => {
            if (err) {
                result.error = err;
                return res.json(result)
            } else {
                result.success = true;
                return res.json(result)
            }
        });
    },

    async edit(req, res, db) {
        var match = req.body.match

        console.log(match)

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
                    result.error = 'Ya existe un partido en esa pista a esa hora y fecha';
                    return res.json(result)
                }else{
                    sql = `UPDATE Matchs SET date = '${match.date}', id_court = '${match.court}', hour = '${match.hour}' WHERE id = '${match.id}'`

                    db.query(sql, (err, data) => {
                        if(err){
                            result.error = err;
                            return res.json(result)
                        }else{
                            result.success = true;
                            return res.json(result)
                        }
                    });
                }
            }
        });
    },

    async getAll(req, res, db) {
        var {first, last} = req.body;

        var matchs = [];

        var sql = `SELECT * FROM Matchs WHERE date >= '${first}' AND date <= '${last}' ORDER BY date ASC, hour DESC`

        await db.query(sql, (err, data) => {
            if (err) {
                return res.json(err)
            } else {
                for (let i = 0; i < data.length; i++) {
                    let match = {
                        id: data[i].id,
                        date: data[i].date,
                        hour: data[i].hour,
                        court: data[i].id_court,
                        players: [],
                    }
                        // getMatchPlayers(match, db).then(response => {
                        //     matchs.push(response);
                        // })
                    matchs.push(match);      
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