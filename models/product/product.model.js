'use strict';

var mongoose = require('mongoose');
var extendSchema = require('mongoose-extend-schema');
var baseModel = require('../base.model');

const productSchema = extendSchema(baseModel, {
    name: { type: String, required: true },
});

var ProductModel = mongoose.model("Product", productSchema, 'products');

module.exports = ProductModel;