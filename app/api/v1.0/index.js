'use strict';

const express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
    console.log('Api v1 get.')
    res.send('Hello v1.0 get API.')
});

router.post('/', function(req, res, next) {
    console.log('Api v1 post.')
    res.send('Hello v1.0 post API.')
});

router.get('/health_test', function(req, res, next) {
    res.send('Hello v1.0 health_test get.')
});

module.exports = router;