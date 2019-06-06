'use strict';

var unitOfWork = require('../db/unit_of_work');
var Product = require('../models/product/product.model')

async function getAllProduct(req, res) {

    let products = await unitOfWork.find(Product);
    
    // res.send(JSON.stringify(products));
    res.json(products);
}

async function getProduct(req, res) {

    console.log('Get Product by Id: ' + req.params.id);
    
    var product = await unitOfWork.findById(Product, req.params.id);
    res.send(JSON.stringify(product));
}

async function addProduct(req, res) {
    
    try {

        res.setHeader('Content-Type', 'application/json');

        var product = new Product(req.body);
    
        await unitOfWork.save(product, function(err, data) {

            if (err) {
    
                return res.send(JSON.stringify({"errorCode": err}, null, 4));
            }
            else {
    
                return res.send(result);
            }
        });
    } catch (err) {
        //throw new Error('Save Product error:' + err);
        res.send(JSON.stringify({"errorCode": err}, null, 4));
    }
}

let controller = {
    "getAll": getAllProduct,
    "get": getProduct,
    "add": addProduct,
}

module.exports = controller;