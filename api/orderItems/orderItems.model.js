'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
///const crypto = require('crypto');
const config = require('../../config/environment');


const OrderItemSchema = new Schema({
    order : {
        type: Schema.Types.ObjectId, 
        ref: 'Order'
    },
    product : {
        type: Schema.Types.ObjectId, 
        ref: 'ProductVariant'
    },
    total_price : {
        type: Number
    },
    final_price : {
        type: Number
    },
    discount : {
        type: Number
    },
    status : {
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

OrderItemSchema.pre('find', function () {
    this.where({ is_active: { $ne: false } });
});

module.exports = mongoose.model('OrderItem', OrderItemSchema);