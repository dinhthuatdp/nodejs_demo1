'use strict';

const express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Hello v2.0 get API.')
});

router.post('/', function(req, res, next) {
    res.send('Hello v2.0 post API.')
});

module.exports = router;