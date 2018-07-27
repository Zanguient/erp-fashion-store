/**
 * Express configuration
 */

'use strict';

const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
// const expressValidator = require('express-validator');
// const methodOverride = require('method-override');
// const cookieParser = require('cookie-parser');
const errorHandler = require('errorhandler');
const path = require('path');
const config = require('./environment');

module.exports = function(app) {
  const env = app.get('env');

  // **ALLOW CORS**** WARN: NOT SECURE 
  app.use(cors());

  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
  app.use(bodyParser.json({ limit: '50mb' }));
//   app.use(expressValidator({
//     customValidators: require("../utils/custom-validations")
//   }));
//  app.use(methodOverride());
//  app.use(cookieParser());
  if ('production' === env) {
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    //app.use(require('connect-livereload')());
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};