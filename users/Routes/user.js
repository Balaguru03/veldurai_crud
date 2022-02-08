const express = require('express')

const app = express.Router();
const users= require('../controller/user')

app.get('/List',users.listofusers)
app.put('/updaterole/:userid',users.updaterole)

module.exports = app