const express = require('express')
const cors = require('cors')
const app = express()
const port = 3080
const mysql = require('mysql')

app.use(cors())
app.use(express.json())

// Database connection
const db_config = {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'central-padel'
}

let connection
function handleDisconnect() {
    connection = mysql.createConnection(db_config);

    connection.connect(function(err) {
        if(err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
    });
    connection.on('error', function(err) {
        console.log('db error', err);
        handleDisconnect();
    });
}
handleDisconnect();

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body
    connection.query(`SELECT * FROM User WHERE email = '${email}' AND password = '${password}'`, (err, result) => {
        if (err) throw err
        res.json(result)
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})