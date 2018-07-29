'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
///const crypto = require('crypto');
const config = require('../../config/environment');


const ProductCategorySchema = new Schema({
    name : {
        type: String,
        required: true
    },
    code : {
        type: String,
        required: true,
        unique: true
    },
    parent : {
        type: Schema.Types.ObjectId, 
        ref: 'ProductCategory'
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

ProductCategorySchema.pre('find', function () {
    this.where({ is_active: { $ne: false } });
});

module.exports = mongoose.model('ProductCategory', ProductCategorySchema);