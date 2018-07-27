'use strict';

const _ = require('lodash');

const mailer = require('../../utils/mailer');


module.exports = {
    index: (req, res) => {
        req.body.email = 'raju.allen1888@gmail.com';
        mailer.welcomeMail(req);
        res.status(200).json({message: "Initial Build"});
    }
}