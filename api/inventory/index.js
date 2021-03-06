'use strict';

const express = require('express');
const controller = require('./inventory.controller');
const config = require('../../config/environment');
const router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/:id', controller.retrieve);

module.exports = router;