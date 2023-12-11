const mongoose = require('mongoose')

const userScheme = new mongoose.Schema({
    lastActive : Date,
    email : String,
    password : String,
    name : String,
    lastname : String,
    verified : Boolean,
    isActive : Boolean,
    loginStamp : Date,
    role : String,
    tel : String
}, {
    timestamps : true
})

const User = mongoose.model('User', userScheme)

module.exports = User
