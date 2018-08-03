'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
///const crypto = require('crypto');
const config = require('../../config/environment');


const TypeDefinitionSchema = new Schema({
    name : {
        type: String,
        required: true,
        unique: true
    },
    type : {
        type: Schema.Types.ObjectId, 
        ref: 'Type'
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

TypeDefinitionSchema.pre('find', function () {
    this.where({ is_active: { $ne: false } });
});

module.exports = mongoose.model('Typedefinition', TypeDefinitionSchema);