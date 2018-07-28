'use strict';

const _ = require('lodash');

//const jwt = require('jsonwebtoken');
const mailer = require('../../utils/mailer');
const config = require('../../config/environment');
const ProductType = require('../productTypes/productTypes.model');


module.exports = {
    index: (req, res) => {
        ProductType
        .find({})
        .populate({path: 'vendor', select : 'name'})
        .exec((err, productTypeDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Product Type Details fetched Successfully", data : productTypeDetails});
        })
    },
    create: (req, res) => {
        ProductType.create(req.body, (err, productTypeDetails) => {
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(201).json({ message: "Product Type Created Successfully", data : productTypeDetails});
        })
    },
    update: (req, res)=>{
        const productTypeId = req.params.id;
        ProductType
        .findByIdAndUpdate(productTypeId, { $set: req.body }).exec((err, productTypeDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Product Type updated" });
        })
    },
    delete: (req, res)=>{
        const productTypeId = req.params.id;
        ProductType
        .findByIdAndUpdate(productTypeId, { $set: { is_active: false } }).exec((err, productTypeDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Product Type Deleted" });
        })
    }
    
}