'use strict';

const _ = require('lodash');

//const jwt = require('jsonwebtoken');
const mailer = require('../../utils/mailer');
const config = require('../../config/environment');
const orderItem = require('../orderItem/orderItem.model');


module.exports = {
    index: (req, res) => {
        orderItem
        .find({})
        .populate({path: 'customer', select : 'name'})
        .exec((err, orderItemDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Order Items fetched Successfully", data : orderItemDetails});
        })
    },
    retrieve: (req, res) => {
        const orderItemId = req.params.id;
        orderItem
        .find({_id:orderItemId})
        .populate({path: 'customer', select : 'name'})
        .exec((err, orderItemDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Order Item Details fetched Successfully", data : orderItemDetails});
        })
    },
    create: (req, res) => {
        orderItem.create(req.body, (err, orderItemDetails) => {
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(201).json({ message: "Order Item Created Successfully", data : orderItemDetails});
        })
    },
    update: (req, res)=>{
        const orderItemId = req.params.id;
        orderItem
        .findByIdAndUpdate(orderItemId, { $set: req.body }).exec((err, orderItemDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Order Item updated" });
        })
    },
    delete: (req, res)=>{
        const orderItemId = req.params.id;
        orderItem
        .findByIdAndUpdate(orderItemId, { $set: { is_active: false } }).exec((err, orderItemDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Order Item Deleted" });
        })
    }
    
}