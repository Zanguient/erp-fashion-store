'use strict';

const express = require('express');
const controller = require('./auths.controller');
// const validatorChains = require('./tenant.validator');
const config = require('../../config/environment');
//const authService = require('../../auth/auth.service');
// const auth = require('../../auth');
const router = express.Router();
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' })

/* ADMIN ROUTES START */
router.get('/', controller.index);

module.exports = router;