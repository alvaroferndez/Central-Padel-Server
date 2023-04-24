module.exports = {

    async getPlayers(req, res, db) {
        var match = req.body.match;

        result = {
            error: ''
        }

        sql = `SELECT * FROM UserMatch WHERE id_match = '${match.id}'`
        await db.query(sql, (err, data) => {
            if (err) {
                result.error = err;
                return res.json(result)
            } else if (data.length == 0){
                for (let j = 0; j < 4; j++) {
                    match.players.push({
                        name: '',
                        surname: '',
                        email: '',
                        position: '',
                    })
                }
                                 
            } 
            // else {
            //     for (let j = 0; j < data.length; j++) {
            //         sql = `SELECT * FROM User WHERE email = '${data[j].email_user}'`
            //         db.query(sql, (err, data) => {
            //             if (err) {
            //                 result.error = err;
            //                 return res.json(result)
            //             } else {
            //                 match.players.push({
            //                     name: data[0].name,
            //                     surname: data[0].surname,
            //                     email: data[0].email,
            //                     position: data[0].position,
            //                 })   
            //             }
            //         })
            //     }
            //     if(match.players.length < 4){
            //         for (let j = 0; j < 4 - match.players.length; j++) {
            //             match.players.push({
            //                 name: '',
            //                 surname: '',
            //                 email: '',
            //                 position: '',
            //             })
            //         }
            //     }
            //     matchs.push(match);
            // }
            return res.json(match);
        })
    }
}