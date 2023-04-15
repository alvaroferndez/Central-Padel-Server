// libraries imports
const express = require('express')
const cors = require('cors')


// init express
const app = express()


// librearies init
app.use(cors())
app.use(express.json())


// import files
const handleDisconnect = require('./config/handle').handleDisconnect
const port = require('./config/database').port;
const connection = require('./config/connection').connection;


// connection initialization
handleDisconnect();
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


// user
const user = require('./controllers/user/controller')

//login
app.post('/api/login', (req, res) => {
        user.login(req, res, connection)
})

//register
app.post('/api/register', (req, res) => {
    user.register(req, res, connection)
})


module.exports = app;
