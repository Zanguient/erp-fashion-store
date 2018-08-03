'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
///const crypto = require('crypto');
const config = require('../../config/environment');


const TypeSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    code : {
        type: String,
        required: true,
        unique: true
    },
    description : {
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

TypeSchema.pre('find', function () {
    this.where({ is_active: { $ne: false } });
});

module.exports = mongoose.model('Type', TypeSchema);