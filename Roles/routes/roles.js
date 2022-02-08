const express = require('express')
var app= express.Router()
var authToken = require('../../auth/controller/auth')
var rolesProcess = require('../controller/roles')

app.post('/add',rolesProcess.roleAdd,authToken.verifytoken)
app.get('/getRoles',rolesProcess.getAll,authToken.verifytoken)
app.put('/editRole/:id',rolesProcess.updateRole,authToken.verifytoken)
app.put('/roles',rolesProcess.set)
app.get('/role/:id',rolesProcess.getById,authToken.verifytoken )
app.get('/menuaccess/:id',rolesProcess.access)


module.exports = app