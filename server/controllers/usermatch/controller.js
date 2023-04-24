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
                    console.log(players[j].email_user)
                    sql = `SELECT * FROM User WHERE email = '${players[j].email_user}'`
                    console.log(sql)
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
    }
}