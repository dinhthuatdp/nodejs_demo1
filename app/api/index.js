'use strict';

const express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Hello get API.')
});

router.post('/', function(req, res, next) {
    res.send('Hello post API.')
});

module.exports = router;