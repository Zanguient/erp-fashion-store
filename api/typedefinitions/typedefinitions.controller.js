'use strict';

const _ = require('lodash');

//const jwt = require('jsonwebtoken');
const mailer = require('../../utils/mailer');
const config = require('../../config/environment');
const typedefinitions = require('../typedefinitions/typedefinitions.model');


module.exports = {
    index: (req, res) => {
        typedefinitions
        .find({})
        .populate({path: 'type', select : 'name'})
        .exec((err, typedefinitionsDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Typedefinitions fetched Successfully", data : typedefinitionsDetails});
        })
    },
    retrieve: (req, res) => {
        const typedefinitionsId = req.params.id;
        typedefinitions
        .find({_id:typedefinitionsId})
        .populate({path: 'type', select : 'name'})
        .exec((err, typedefinitionsDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Typedefinition Details fetched Successfully", data : typedefinitionsDetails});
        })
    },
    create: (req, res) => {
        typedefinitions.create(req.body, (err, typedefinitionsDetails) => {
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(201).json({ message: "Typedefinition Created Successfully", data : typedefinitionsDetails});
        })
    },
    update: (req, res)=>{
        const typedefinitionsId = req.params.id;
        typedefinitions
        .findByIdAndUpdate(typedefinitionsId, { $set: req.body }).exec((err, typedefinitionsDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Typedefinition updated" });
        })
    },
    delete: (req, res)=>{
        const typedefinitionsId = req.params.id;
        typedefinitions
        .findByIdAndUpdate(typedefinitionsId, { $set: { is_active: false } }).exec((err, typedefinitionsDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Typedefinition Deleted" });
        })
    }
    
}