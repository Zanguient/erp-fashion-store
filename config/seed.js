/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below
var User = require('../api/users/users.model');
var async = require('async');

User.countDocuments({}).exec((err, count) => {
  if (err) {
    console.error(err);
    return;
  }
  if (count == 0) {
    User.create({
        name : 'Allen',
        email_id : 'raju.allen1888@gmail.com',
        password : 'fsadmin'
    }, (err, seedUser) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Seed superuser created");

    })
  }

})