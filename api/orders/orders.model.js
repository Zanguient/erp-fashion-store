'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
///const crypto = require('crypto');
const config = require('../../config/environment');


const OrderSchema = new Schema({
    order_no : {
        type: String,
        required: true,
        unique: true
    },
    customer : {
        type: Schema.Types.ObjectId, 
        ref: 'Customer'
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
    payment_mode : {
        type: String
    },
    transaction_id : {
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

OrderSchema.pre('find', function () {
    this.where({ is_active: { $ne: false } });
});

module.exports = mongoose.model('Order', OrderSchema);