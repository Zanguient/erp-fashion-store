/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.ERPFS_NODE_ENV = process.env.ERPFS_NODE_ENV || 'development';

const argv = require('minimist')(process.argv.slice(2));
const express = require('express');
const config = require('./config/environment');
const mysql = require('mysql')
// const dbService = require('./api/services/dbConnections');
// let authService = require('./auth/auth.service');
// var services = require('./services');
const path = require('path');


const connection = mysql.createConnection({
    host     : config.db.host,
    user     : config.db.user,
    password : config.db.password,
    database : config.db.database
  });
  
connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
})


const app = express();


const server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);
require('./config/seed');

// Start server
server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;