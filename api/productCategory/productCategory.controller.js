'use strict';

const _ = require('lodash');

//const jwt = require('jsonwebtoken');
const mailer = require('../../utils/mailer');
const config = require('../../config/environment');
const productCategory = require('../productCategory/productCategory.model');


module.exports = {
    index: (req, res) => {
        productCategory
        .find({})
        .populate({path: 'parent', select : 'name'})
        .exec((err, productCategoryDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Product Categories fetched Successfully", data : productCategoryDetails});
        })
    },
    retrieve: (req, res) => {
        const productCategoryId = req.params.id;
        productCategory
        .find({_id:productCategoryId})
        .populate({path: 'parent', select : 'name'})
        .exec((err, productCategoryDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Product Category Details fetched Successfully", data : productCategoryDetails});
        })
    },
    create: (req, res) => {
        productCategory.create(req.body, (err, productCategoryDetails) => {
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(201).json({ message: "Product Category Created Successfully", data : productCategoryDetails});
        })
    },
    update: (req, res)=>{
        const productCategoryId = req.params.id;
        productCategory
        .findByIdAndUpdate(productCategoryId, { $set: req.body }).exec((err, productCategoryDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Product Category updated" });
        })
    },
    delete: (req, res)=>{
        const productCategoryId = req.params.id;
        productCategory
        .findByIdAndUpdate(productCategoryId, { $set: { is_active: false } }).exec((err, productCategoryDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Product Category Deleted" });
        })
    }
    
}