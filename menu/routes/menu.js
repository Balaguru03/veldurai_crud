const express = require('express')
app= express.Router()
const menu = require('../controller/menu')
var authToken = require('../../auth/controller/auth')

app.post('/addMenu',menu.addmenu,authToken.verifytoken)
app.get('/getMenus',menu.getMenus,authToken.verifytoken)
app.get('/listMenus',menu.Listmenus,authToken.verifytoken)
app.get('/menu/:id',menu.getoneMenu,authToken.verifytoken)
app.put('/updateMenu/:id',menu.updateMenu,authToken.verifytoken)


module.exports = app