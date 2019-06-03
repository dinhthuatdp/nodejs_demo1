'use strict';

var mongoose = require('mongoose');
var dateFormat = require('dateformat');
var mongodb = require('../db');
var Product = require('../models/product/product.model')

const Schema = mongoose.Schema;

var db = mongodb.open();

async function getAllProduct(req, res) {

    let products = await mongodb.find(Product);
    console.log('Product list: ' + JSON.stringify(products));
    res.send(JSON.stringify(products));
}

async function getProduct(req, res) {

    console.log('Get Product by Id: ' + req.params.id);
    var product = await mongodb.findById(Product, req.params.id);
    res.send(JSON.stringify(product));
}

async function addProduct(req, res) {
    
    try {
        res.setHeader('Content-Type', 'application/json');

        var product = new Product();
        product._id = req.body._id;
        product.name = req.body.name;
    
        var result = await mongodb.save(Product, product);
        if (result == 900
            || result == 901) {

                res.send(JSON.stringify({"errorCode": result.toString()}, null, 4));
        }
        else {

            res.send(result);
        }
    } catch (err) {
        throw new Error('Save Product error:' + err);
    }
}

let controller = {
    "getAll": getAllProduct,
    "get": getProduct,
    "add": addProduct,
}

module.exports = controller;