'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
///const crypto = require('crypto');
const config = require('../../config/environment');


const PurchaseHistorySchema = new Schema({
    product : {
        type: Schema.Types.ObjectId, 
        ref: 'ProductVariant'
    },
    purchase_dt : {
        type: Date
    },
    vendor : {
        type: Schema.Types.ObjectId, 
        ref: 'Vendor'
    },
    quantity : {
        type: Number 
    },
    price_per_item:{
        type: Number
    },
    total_price: {
        type: Number
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

PurchaseHistorySchema.pre('find', function () {
    this.where({ is_active: { $ne: false } });
});

module.exports = mongoose.model('PurchaseHistory', PurchaseHistorySchema);