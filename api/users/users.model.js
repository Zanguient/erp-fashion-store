'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
///const crypto = require('crypto');
const config = require('../../config/environment');
const nodemailer = require('nodemailer');
//const moment = require('moment');
const DEFAULTPASSWORD = 'fsadmin';
const bcrypt = require('bcryptjs');


const UserSchema = new Schema({
    name : {
        type: String
    },
    email_id : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
},{
    id: false,
    toObject: {
        virtuals: true,
        getters: true
    },
    toJSON: { 
        virtuals: true,
        getters: true, 
        setters: false 
    },
    timestamps: true
});


var validatePresenceOf = function (value) {
    return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
.pre('save', function (next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.password)) {
        next()
    } else {
        this.newPassword = this.password || DEFAULTPASSWORD;
        this.password = bcrypt.hashSync(this.newPassword, 8);
        return next();
    }
});


module.exports = mongoose.model('User', UserSchema);

// module.exports = function (model) {
//     // if (model)
//     //     return mongoose.model('User', UserSchema);
//     // else
//         return UserSchema;
//}