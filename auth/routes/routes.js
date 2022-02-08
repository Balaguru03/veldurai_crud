const express=require('express');
var app=express.Router();
var auth = require('.././controller/auth')

app.post("/signup",auth.signup)
app.post("/login",auth.signin)
// app.get("/me")
app.get("/me", auth.verifytoken, auth.users);
//   app.post("/logout",auth.verifytoken,auth.logout)
module.exports = app;