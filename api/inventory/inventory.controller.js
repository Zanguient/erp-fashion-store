'use strict';

const _ = require('lodash');

//const jwt = require('jsonwebtoken');
const mailer = require('../../utils/mailer');
const config = require('../../config/environment');
const inventory = require('../inventory/inventory.model');


module.exports = {
    index: (req, res) => {
        inventory
        .find({})
        .populate({path: 'product', select : 'name'})
        .exec((err, inventoryDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Inventory fetched Successfully", data : inventoryDetails});
        })
    },
    retrieve: (req, res) => {
        const inventoryId = req.params.id;
        inventory
        .find({_id:inventoryId})
        .populate({path: 'product', select : 'name'})
        .exec((err, inventoryDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Inventory Details fetched Successfully", data : inventoryDetails});
        })
    },
    create: (req, res) => {
        inventory.create(req.body, (err, inventoryDetails) => {
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(201).json({ message: "Inventory Created Successfully", data : inventoryDetails});
        })
    },
    update: (req, res)=>{
        const inventoryId = req.params.id;
        inventory
        .findByIdAndUpdate(inventoryId, { $set: req.body }).exec((err, inventoryDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Inventory updated" });
        })
    },
    delete: (req, res)=>{
        const inventoryId = req.params.id;
        inventory
        .findByIdAndUpdate(inventoryId, { $set: { is_active: false } }).exec((err, inventoryDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Inventory Deleted" });
        })
    }
    
}