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
                    // comprobar que ninguno de los jugadores tiene partido a esa hora
                    sql = `SELECT * FROM UserMatch WHERE id_match = '${match.id}'`;

                    db.query(sql, (err, data) => {
                        if(err){
                            result.error = err;
                            return res.json(result)
                        }else{
                            console.log(data)
                            if(data.length > 0){
                                sql = `DELETE FROM UserMatch WHERE id_match = '${match.id}'`;

                                db.query(sql, (err, data) => {
                                    if(err){
                                        result.error = err;
                                        return res.json(result)
                                    }else{
                                        for (let i = 0; i < data.length; i++) {
                                            sql = `SELECT * FROM UserMatch WHERE id_user = '${data[i].id_user}' AND id_match IN (SELECT id FROM Matchs WHERE date = '${match.date}' AND hour = '${match.hour}')`;
                                            db.query(sql, (err, data) => {
                                                if(err){
                                                    result.error = err;
                                                    return res.json(result)
                                                }else{
                                                    if(data.length > 0){
                                                        result.error = 'Uno de los jugadores ya tiene partido a esa hora';
                                                        return res.json(result)
                                                    }else{
                                                        // insertar los jugadores en el partido
        
                                                        sql = `INSERT INTO UserMatch (id_user, id_match) VALUES ('${data[i].id_user}', '${data[i].id_match})`;
        
                                                        db.query(sql, (err, data) => {
                                                            if(err){
                                                                result.error = err;
                                                                return res.json(result)
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });

                                
                            }else{
                                for (let i = 0; i < match.players.length; i++) {        
                                    sql = `INSERT INTO UserMatch (email_user, id_match) VALUES ('${match.players[i].email}', '${match.id}')`;
                                        
                                    db.query(sql, (err, data) => {
                                        if(err){
                                            console.log(err)
                                        }
                                    });
                                }
                            }
                        }
                    });            
                    
                    sql = `UPDATE Matchs SET date = '${match.date}', hour = '${match.hour}', id_court = '${match.court}' WHERE id = '${match.id}'`;

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