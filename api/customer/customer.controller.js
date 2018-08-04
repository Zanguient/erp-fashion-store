'use strict';

const _ = require('lodash');

//const jwt = require('jsonwebtoken');
const mailer = require('../../utils/mailer');
const config = require('../../config/environment');
const customer = require('../customer/customer.model');


module.exports = {
    index: (req, res) => {
        customer
        .find({})
        .exec((err, customerDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Customer fetched Successfully", data : customerDetails});
        })
    },
    retrieve: (req, res) => {
        const customerId = req.params.id;
        customer
        .find({_id:customerId})
        .exec((err, customerDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Customer Details fetched Successfully", data : customerDetails});
        })
    },
    create: (req, res) => {
        customer.create(req.body, (err, customerDetails) => {
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(201).json({ message: "Customer Created Successfully", data : customerDetails});
        })
    },
    update: (req, res)=>{
        const customerId = req.params.id;
        customer
        .findByIdAndUpdate(customerId, { $set: req.body }).exec((err, customerDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Customer updated" });
        })
    },
    delete: (req, res)=>{
        const customerId = req.params.id;
        customer
        .findByIdAndUpdate(customerId, { $set: { is_active: false } }).exec((err, customerDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Customer Deleted" });
        })
    }
    
}