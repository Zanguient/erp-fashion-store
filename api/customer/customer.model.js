'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
///const crypto = require('crypto');
const config = require('../../config/environment');


const CustomerSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    code : {
        type: String,
        required: true,
        unique: true
    },
    phone_no : {
        type: String
    },
    email : {
        type: String
    },
    place : {
        type: String
    },
    is_active : {
        type: Boolean,
        default: true
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

CustomerSchema.pre('find', function () {
    this.where({ is_active: { $ne: false } });
});

module.exports = mongoose.model('Customer', CustomerSchema);