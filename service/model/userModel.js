const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const uuid1 = require('uuid/v1');
const uuid3 = require('uuid/v3');

var UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    password: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    emailID: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    userID: {
        type: String,
        require: true,
        minlength: 1,
        trim: true
    },
    updatedOn: {
        type: Date,
        default: new Date()
    }
})

UserSchema.methods.generateUserID = function(){
    var user = this;
    var NAME_SPACE = uuid1();
    return uuid3(user.userName,NAME_SPACE);    
}

UserSchema.methods.generateToken = function () {
    var user = this;
    var token = jwt.sign({ _id: user._id }, user.password);
    return token;    
}

var User = mongoose.model('User', UserSchema)

module.exports = { User }