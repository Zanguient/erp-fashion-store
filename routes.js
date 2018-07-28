/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {

    app.use('/api/v1/auths', require('./api/auths'));
    app.use('/api/v1/vendors', require('./api/vendors'));
    app.use('/api/v1/productTypes', require('./api/productTypes'));    
};