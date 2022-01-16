// Imports

const express = require('express'); //expressjs 
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const crudRoute = require('./CRUD/crud.route')
var databaseconfiguration = require('./databaseconfig')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


var port = 3000

app.use('/crudOperation',crudRoute)
databaseconfiguration.connect(() => {
    app.listen(port,function () {
        console.log('Server listening on port ', port);
    });
})