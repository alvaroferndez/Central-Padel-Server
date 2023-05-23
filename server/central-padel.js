// libraries imports
const express = require('express')
const cors = require('cors')
const multer = require('multer')


// init express
const app = express()


// librearies init
app.use(cors())
app.use(express.json())
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname.split('.')[0] + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1])
    }
})
const upload = multer({ storage: storage });


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
const user_device = require('./controllers/userdevice/controller')

//login
app.post('/api/login', (req, res) => {
        user.login(req, res, connection)
})

//register
app.post('/api/register', (req, res) => {
    user.register(req, res, connection)
})

// check if user is logged
app.post('/api/user', (req, res) => {
    user_device.checkUserLogged(req, res, connection);
})

// logout
app.post('/api/logout', (req, res) => {
    user_device.logout(req, res, connection);
})

// edit user data
app.post('/api/user/update', (req, res) => {
   user.update(req, res, connection);
});

// upload user image
app.post('/api/user/upload_image', upload.single('file'), (req, res) => {
    user.uploadImage(req, res, connection);
});

// delete user
app.delete('/api/admin/user/delete', (req, res) => {
    user.delete(req, res, connection);
 });

// get all users
app.post('/api/user/all', (req, res) => {
    user.getAll(req, res, connection);
});

// get user by email
app.post('/api/user/get_user', (req, res) => {
    user.getUserByEmail(req, res, connection);
});



// match
const match = require('./controllers/match/controller')
const usermatch = require('./controllers/usermatch/controller')

// add match
app.post('/api/admin/match/add', (req, res) => {
    match.add(req, res, connection);
});

// delete match
app.post('/api/admin/match/delete', (req, res) => {
    match.delete(req, res, connection);
});

// edit match
app.post('/api/admin/match/edit', (req, res) => {
    match.edit(req, res, connection);
});

// get all matchs
app.post('/api/admin/match/getAll', (req, res) => {
    match.getAll(req, res, connection);
});

app.post('/api/admin/match/getAll2', (req, res) => {
    usermatch.getPlayers(req, res, connection);
});

// get by id
app.post('/api/admin/match/getById', (req, res) => {
    match.getById(req, res, connection);
});


// products
const product = require('./controllers/product/controller')

// get all products
app.post('/api/admin/product', (req, res) => {
    product.getAll(req, res, connection);
});

// add product
app.post('/api/admin/product/add', upload.single('image'), (req, res) => {
    product.add(req, res, connection);
});

module.exports = app;
