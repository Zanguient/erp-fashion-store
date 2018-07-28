'use strict';

const _ = require('lodash');

const jwt = require('jsonwebtoken');
const mailer = require('../../utils/mailer');
const config = require('../../config/environment');
const User = require('../users/users.model');
const bcrypt = require('bcryptjs');


module.exports = {
    index: (req, res) => {
        req.body.email = 'raju.allen1888@gmail.com';
        mailer.welcomeMail(req);
        res.status(200).json({message: "Initial Build"});
    },

    login: (req, res) => {
        User.findOne({email_id : req.body.email_id},function(err, user){
            if(err){
                return res.status(401).json({message : err});
            }
    
            var isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    
            if(!isPasswordValid){
                return res.status(401).json({auth : false, token : null, message : "Not Authorised User"});
            }else{
    
                let payload = {
                    user_id : user._id,
                    user_email : user.email_id
                }
    
                let token = jwt.sign(payload, config.secrets.session,{
                    expiresIn : 240
                });
                
                return res.status(200).json({auth : true, token : token, message : "User Logged In Successfully"});
            }
        });
    
    }
}