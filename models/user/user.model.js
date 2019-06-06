'use strict';

var mongoose = require('mongoose');
var extendSchema = require('mongoose-extend-schema');
var bcrypt = require('bcrypt');

var baseModel = require('../base.model');

const UserSchema = extendSchema(baseModel, {
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

var UserModel = mongoose.model("User", UserSchema, "users");

module.exports = UserModel;