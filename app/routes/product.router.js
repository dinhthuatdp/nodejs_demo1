'use strict';

var express = require('express');
var productController = require('../controllers/product.controller');

const router = express.Router();

console.log('----------Product router.');

// Get all products.
router.route('/').get(productController.getAll);

// Get product by Id.
router.route('/:id').get(productController.get);

// Add product.
router.route('/add').post(productController.add, express.json({ type: '*/*' }));

module.exports = router;