module.exports = {

    async getPlayers(req, res, db) {
        var match = req.body.match;

        result = {
            error: ''
        }

        match.players = [];

        sql = `SELECT * FROM UserMatch WHERE id_match = '${match.id}'`
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
                    sql = `SELECT * FROM User WHERE email = '${players[j].email_user}'`
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
                                })
                            }else{
                                match.players.push({
                                    name: data[0].name,
                                    surname: data[0].surname,
                                    email: data[0].email,
                                    position: data[0].position,
                                    username: data[0].username,
                                })
                            }
                            if(match.players.length == 4){
                                return res.json(match)
                            }   
                        }
                    })
                }
                // if(match.players.length < 4){
                //     for (let j = 0; j < 4 - match.players.length; j++) {
                //         match.players.push({
                //             name: '',
                //             surname: '',
                //             email: '',
                //             position: '',
                //         })
                //     }
                // }
            }
        })
    },

    async updateMatch(match, res, db) {
        // comprobar que ninguno de los jugadores tiene partido a esa hora
        sql = `SELECT * FROM UserMatch WHERE id_match = '${match.id}'`;

        db.query(sql, (err, data) => {
            if(err){
                result.error = err;
                return res.json(result)
            }else{
                if(data.length > 0){
                    sql = `DELETE FROM UserMatch WHERE id_match = '${match.id}'`;

                    db.query(sql, (err, data) => {
                        if(err){
                            result.error = err;
                            return res.json(result)
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