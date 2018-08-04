'use strict';

const _ = require('lodash');

//const jwt = require('jsonwebtoken');
const mailer = require('../../utils/mailer');
const config = require('../../config/environment');
const orders = require('../orders/orders.model');


module.exports = {
    index: (req, res) => {
        orders
        .find({})
        .populate({path: 'customer', select : 'name'})
        .exec((err, ordersDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Orders fetched Successfully", data : ordersDetails});
        })
    },
    retrieve: (req, res) => {
        const ordersId = req.params.id;
        orders
        .find({_id:ordersId})
        .populate({path: 'customer', select : 'name'})
        .exec((err, ordersDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Order Details fetched Successfully", data : ordersDetails});
        })
    },
    create: (req, res) => {
        orders.create(req.body, (err, ordersDetails) => {
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(201).json({ message: "Order Created Successfully", data : ordersDetails});
        })
    },
    update: (req, res)=>{
        const ordersId = req.params.id;
        orders
        .findByIdAndUpdate(ordersId, { $set: req.body }).exec((err, ordersDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Order updated" });
        })
    },
    delete: (req, res)=>{
        const ordersId = req.params.id;
        orders
        .findByIdAndUpdate(ordersId, { $set: { is_active: false } }).exec((err, ordersDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Order Deleted" });
        })
    }
    
}