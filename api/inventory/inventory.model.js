'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
///const crypto = require('crypto');
const config = require('../../config/environment');


const InventorySchema = new Schema({
    product : {
        type: Schema.Types.ObjectId, 
        ref: 'ProductVariant'
    },
    quantity : {
        type: Number
    },
    returned_quantity : {
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

InventorySchema.pre('find', function () {
    this.where({ is_active: { $ne: false } });
});

module.exports = mongoose.model('Inventory', InventorySchema);