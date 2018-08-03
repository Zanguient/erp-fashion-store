'use strict';

const _ = require('lodash');

//const jwt = require('jsonwebtoken');
const mailer = require('../../utils/mailer');
const config = require('../../config/environment');
const productVariant = require('../productVariants/productVariants.model');
// const type = require('')


module.exports = {
    index: (req, res) => {
        productVariant
        .find({})
        .populate({path: 'category', select : 'name'})
        .populate({ path: 'typedefinition', select : 'name'})
        .populate({ path: 'size', select : 'name'})
        .exec((err, productVariantDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Product Variant Details fetched Successfully", data : productVariantDetails});
        })
    },
    retrieve: (req, res) => {
        productVariant
        .find({_id:req.params.id})
        .populate({path: 'category', select : 'name'})
        .populate({ path: 'typedefinition', select : 'name'})
        .populate({ path: 'size', select : 'name'})
        .exec((err, productVariantDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Product Variant Details fetched Successfully", data : productVariantDetails});
        })
    },
    create: (req, res) => {

        req.body.code = "ttt"+req.body.price+"sss"
        productVariant.create(req.body, (err, productVariantDetails) => {
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(201).json({ message: "Product Variant Created Successfully", data : productVariantDetails});
        })
    },
    update: (req, res)=>{
        const productVariantId = req.params.id;
        productVariant
        .findByIdAndUpdate(productVariantId, { $set: req.body }).exec((err, productVariantDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Product Variant updated" });
        })
    },
    delete: (req, res)=>{
        const productVariantId = req.params.id;
        productVariant
        .findByIdAndUpdate(productTypeId, { $set: { is_active: false } }).exec((err, productVariantDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Product Variant Deleted" });
        })
    }
    
}