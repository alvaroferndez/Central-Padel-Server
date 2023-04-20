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

    getAll(req, res, db) {
        var {first, last} = req.body;

        var matchs = [];

        var sql = `SELECT * FROM Matchs WHERE date >= '${first}' AND date <= '${last}' ORDER BY date ASC, hour DESC`

        db.query(sql, (err, data) => {
            if (err) {
                return res.json(err)
            } else {
                for (let i = 0; i < data.length; i++) {
                    var match = {
                        id: data[i].id,
                        date: data[i].date,
                        hour: data[i].hour,
                        court: data[i].id_court,
                        players: [],
                    }
                    // sql = `SELECT * FROM Matchs_Players WHERE id_match = '${match.id}'`
                    // db.query(sql, (err, data) => {
                    //     if (err) {
                    //         result.error = err;
                    //         return res.json(result)
                    //     } else {
                    //         for (let j = 0; j < data.length; j++) {
                    //             match.players.push(data[j].id_player)
                    //         }
                    //         matchs.push(match);
                    //     }
                    // })
                    matchs.push(match);
                }
                return res.json(matchs)
            }
        });
    }
}