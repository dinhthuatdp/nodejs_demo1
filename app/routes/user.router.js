'use strict';

var express = require('express');
var userController = require('../../controllers/user.controller');

// function init() {

    const router = express.Router();
    console.log('----------User router.');
    
    // Register user.
    router.route('/register').post(userController.register,
        express.json({ type: '*/*' }));
    
    // Signin.
    router.route('/signin').post(userController.signin,
        express.json({ type: '*/*' }));
// }

module.exports = router;