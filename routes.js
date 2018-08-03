/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {

    app.use('/api/v1/auths', require('./api/auths'));
    app.use('/api/v1/vendors', require('./api/vendors'));
    app.use('/api/v1/productTypes', require('./api/productTypes'));
    app.use('/api/v1/productcategory', require('./api/productCategory'));
    app.use('/api/v1/types', require('./api/types'));
    app.use('/api/v1/typedefinitions', require('./api/typedefinitions'));
    app.use('/api/v1/sizes', require('./api/sizes'));
    app.use('/api/v1/productvariants', require('./api/productVariants'));    
};