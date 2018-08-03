    'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
///const crypto = require('crypto');
const config = require('../../config/environment');


const ProductVariantSchema = new Schema({
    code : {
        type: String,
        required: true,
        unique: true
    }, 
    name : {
        type: String,
        required: true
    },
    category : {
        type: Schema.Types.ObjectId, 
        ref: 'ProductCategory',
        required: true
    },
    typedefinition : {
        type: Schema.Types.ObjectId, 
        ref: 'Typedefinition',
        required: true
    },
    size: {
        type: Schema.Types.ObjectId, 
        ref: 'Size',
        required: true
    }, 
    price : {
        type: Number,
        required : true
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

ProductVariantSchema.pre('find', function () {
    this.where({ is_active: { $ne: false } });
});

module.exports = mongoose.model('ProductVariant', ProductVariantSchema);