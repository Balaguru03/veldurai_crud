// Imports

const express = require('express'); //expressjs 
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const crudRoute = require('./CRUD/crud.route')
var databaseconfiguration = require('./databaseconfig')
const auth = require('./auth/routes/routes')
const roles =require('./Roles/routes/roles')
const menu = require('./menu/routes/menu')
const user = require('./users/Routes/user')
const defaultrole= require('./Roles/controller/roles')
var token = require('./auth/controller/auth')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


var port = 3000

app.use('/api', auth)
app.use('/roles',token.verifytoken,roles)
app.use('/menu',token.verifytoken,menu)
app.use('/users',token.verifytoken,user)


// uncomment below for updated version
// app.use('/crudOperation',token.verifytoken,crudRoute)
// databaseconfiguration.connect(() => {
//     app.listen(port,function () {
//         defaultrole.initialrole()
//         console.log('Server listening on port ', port);
//     });
// })


// comment below lines for token service system
app.use('/crudOperation',crudRoute)
databaseconfiguration.connect(() => {
    app.listen(port,function () {
        console.log('Server listening on port ', port);
    });
})