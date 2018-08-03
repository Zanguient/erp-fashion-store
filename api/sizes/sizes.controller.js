'use strict';

const _ = require('lodash');

//const jwt = require('jsonwebtoken');
const mailer = require('../../utils/mailer');
const config = require('../../config/environment');
const size = require('../sizes/sizes.model');


module.exports = {
    index: (req, res) => {
        size
        .find({})
        .exec((err, sizeDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Sizes fetched Successfully", data : sizeDetails});
        })
    },
    retrieve: (req, res) => {
        const sizeId = req.params.id;
        size
        .find({_id:sizeId})
        .exec((err, sizeDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            if(sizeDetails.length > 0) {
                res.status(200).json({ message: "Size Details fetched Successfully", data : sizeDetails});    
            } else {
                res.status(200).json({ message: "No Records Found", data : sizeDetails});
            }
            
        })
    },
    create: (req, res) => {
        size.create(req.body, (err, sizeDetails) => {
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(201).json({ message: "Size Created Successfully", data : sizeDetails});
        })
    },
    update: (req, res)=>{
        const sizeId = req.params.id;
        size
        .findByIdAndUpdate(sizeId, { $set: req.body }).exec((err, sizeDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Size updated" });
        })
    },
    delete: (req, res)=>{
        const sizeId = req.params.id;
        size
        .findByIdAndUpdate(sizeId, { $set: { is_active: false } }).exec((err, sizeDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Size Deleted" });
        })
    }
    
}