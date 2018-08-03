'use strict';

const _ = require('lodash');

//const jwt = require('jsonwebtoken');
const mailer = require('../../utils/mailer');
const config = require('../../config/environment');
const types = require('../types/types.model');


module.exports = {
    index: (req, res) => {
        types
        .find({})
        .exec((err, typesDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Types fetched Successfully", data : typesDetails});
        })
    },
    retrieve: (req, res) => {
        const typesId = req.params.id;
        types
        .find({_id:typesId})
        .exec((err, typesDetails)=>{
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(200).json({ message: "Type Details fetched Successfully", data : typesDetails});
        })
    },
    create: (req, res) => {
        types.create(req.body, (err, typesDetails) => {
            if (err) {
                console.error(err);
                res.status(500).json({message : err})
            }
            res.status(201).json({ message: "Type Created Successfully", data : typesDetails});
        })
    },
    update: (req, res)=>{
        const typesId = req.params.id;
        types
        .findByIdAndUpdate(typesId, { $set: req.body }).exec((err, typesDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Type updated" });
        })
    },
    delete: (req, res)=>{
        const typesId = req.params.id;
        types
        .findByIdAndUpdate(typesId, { $set: { is_active: false } }).exec((err, typesDetails) => {
            if (err) res.status(500).json({message : err})
            res.status(200).json({ message: "Type Deleted" });
        })
    }
    
}