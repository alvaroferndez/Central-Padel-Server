module.exports = {

    async getPlayers(req, res, db) {
        var match = req.body.match;

        result = {
            error: ''
        }

        match.players = [];

        sql = `SELECT * FROM usermatch WHERE id_match = '${match.id}'`
        await db.query(sql, (err, players) => {
            if (err) {
                result.error = err;
                return res.json(result)
            } else if (players.length == 0){
                for (let j = 0; j < 4; j++) {
                    match.players.push({
                        name: '',
                        surname: '',
                        email: '',
                        position: '',
                        username: '',
                    })
                }
                return res.json(match)                      
            } 
            else {
                for (let j = 0; j < players.length; j++) {
                    sql = `SELECT * FROM user WHERE email = '${players[j].email_user}'`
                    db.query(sql, (err, data) => {
                        if (err) {
                            result.error = err;
                            return res.json(result)
                        } else {
                            if(data.length == 0){
                                match.players.push({
                                    name: '',
                                    surname: '',
                                    email: '',
                                    position: '',
                                    username: '',
                                    path: '',
                                })
                            }else{
                                match.players.push({
                                    name: data[0].name,
                                    surname: data[0].surname,
                                    email: data[0].email,
                                    position: data[0].position,
                                    username: data[0].username,
                                    path: data[0].path,
                                })
                            }
                            if(match.players.length == 4){
                                return res.json(match)
                            }   
                        }
                    })
                }
            }
        })
    },

    async updateMatch(match, res, db) {
        // comprobar que ninguno de los jugadores tiene partido a esa hora
        sql = `SELECT * FROM usermatch WHERE id_match = '${match.id}'`;

        db.query(sql, (err, data) => {
            if(err){
                result.error = err;
                return res.json(result)
            }else{
                if(data.length > 0){
                    sql = `DELETE FROM usermatch WHERE id_match = '${match.id}'`;

                    db.query(sql, (err, data) => {
                        if(err){
                            result.error = err;
                            return res.json(result)
                        }else{
                            for (let i = 0; i < match.players.length; i++) {        
                                sql = `INSERT INTO usermatch (email_user, id_match) VALUES ('${match.players[i].email}', '${match.id}')`;
                                    
                                db.query(sql, (err, data) => {
                                    if(err){
                                        console.log(err)
                                    }
                                });
                            } 
                        }
                    });

                    
                }else{
                    for (let i = 0; i < match.players.length; i++) {        
                        sql = `INSERT INTO usermatch (email_user, id_match) VALUES ('${match.players[i].email}', '${match.id}')`;
                            
                        db.query(sql, (err, data) => {
                            if(err){
                                console.log(err)
                            }
                        });
                    }
                }
            }
        });            
        
        sql = `UPDATE matchs SET date = '${match.date}', hour = '${match.hour}', id_court = '${match.court}' WHERE id = '${match.id}'`;

        db.query(sql, (err, data) => {
            if(err){
                result.error = err;
                return res.json(result)
            }else{
                result.success = true;
                return res.json(result)
            }
        });
    },

    async add(req, res, db) {
        result = {
            success: false,
            error: '',
            data: []
        }

        var id_match = req.body.id_match;
        var email_user = req.body.email_user;

        db.query('SELECT * FROM usermatch WHERE id_match = ?', [id_match], (err, data) => {
            if (err) {
                result.error = err;
                return res.json(result)
            } else {
                let id_usermatch = '';
                let added = false;
                for(let i = 0; i < data.length; i++){
                    if(data[i].email_user == email_user){
                        result.error = 'Ya estás apuntado a este partido'
                        return res.json(result)
                    }else if(data[i].email_user == '' && !added){
                        id_usermatch = data[i].id;
                        added = true;
                    }
                }

                if(added){
                    db.query('UPDATE usermatch SET email_user = ? WHERE id = ?', [email_user, id_usermatch], (err, data) => {
                        if (err) {
                            result.error = err;
                            return res.json(result)
                        } else {
                            result.success = true;
                            return res.json(result)
                        }
                    })
                }else{
                    result.error = 'El partido está completo'
                    return res.json(result)
                }
            }
        }
        )
    },

    addEmptyPlayers(match, db) {
        for (let i = 0; i < 4; i++) {
            db.query('INSERT INTO usermatch (email_user, id_match) VALUES (?, ?)', ['', match], (err, data) => {
                if (err) {
                    console.log(err)
                }
            });
        }
    }
}