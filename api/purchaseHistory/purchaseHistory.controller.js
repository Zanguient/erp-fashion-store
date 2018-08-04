'use strict';

const _ = require('lodash');

//const jwt = require('jsonwebtoken');
const mailer = require('../../utils/mailer');
const config = require('../../config/environment');
const purchaseHistory = require('../purchaseHistory/purchaseHistory.model');


module.exports = {
    index: (req, res) => {
        purchaseHistory
        .find({})
        .populate({path: 'product', select : 'name'})
        .populate({path: 'vendor', select : 'name'})
        .exec((err, purchaseHistoryDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Purchase History fetched Successfully", data : purchaseHistoryDetails});
        })
    },
    retrieve: (req, res) => {
        const purchaseHistoryId = req.params.id;
        purchaseHistory
        .find({_id:purchaseHistoryId})
        .populate({path: 'product', select : 'name'})
        .populate({path: 'vendor', select : 'name'})
        .exec((err, purchaseHistoryDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Purchase History Details fetched Successfully", data : purchaseHistoryDetails});
        })
    },
    create: (req, res) => {
        purchaseHistory.create(req.body, (err, purchaseHistoryDetails) => {
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(201).json({ message: "Purchase History Created Successfully", data : purchaseHistoryDetails});
        })
    },
    update: (req, res)=>{
        const purchaseHistoryId = req.params.id;
        purchaseHistory
        .findByIdAndUpdate(purchaseHistoryId, { $set: req.body }).exec((err, purchaseHistoryDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Purchase History updated" });
        })
    },
    delete: (req, res)=>{
        const purchaseHistoryId = req.params.id;
        purchaseHistory
        .findByIdAndUpdate(purchaseHistoryId, { $set: { is_active: false } }).exec((err, purchaseHistoryDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Purchase History Deleted" });
        })
    }
    
}