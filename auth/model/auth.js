const mongoose = require('mongoose')

const users = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    userName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    mobile: {
        type: Number,
    },
    Role: {
        RoleId:{
            type:mongoose.Types.ObjectId,
            ref: 'Roles'
        }
        
    }
})

module.exports = mongoose.model('UsersList', users)