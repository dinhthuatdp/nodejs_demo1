'use strict';

var fs = require('fs');
var unitOfWord = require('../db/unit_of_work');
var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  // User = mongoose.model('User');
  User = require('../models/user/user.model');

  exports.register = async function(req, res) {

    console.log('register user');
    var newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    await unitOfWord.save(newUser, function(err, data) {
  
      if (err) {

        return res.send({message: err});
      } else {
        data.hash_password = undefined;
        return res.json(data);
      }
    });
  };

  exports.signin = async function(req, res) {
  
    var user = await unitOfWord.findOne(User, {
      username: req.body.username
    });
    console.log('user sign-in: ' + user);
    if (!user) {

      res.status(401).json({
        message: 'Authentication failed. User not found.'
      });
    } else {
        
      if (!user.comparePassword(req.body.password)) {

        res.status(401).json({
        
          message: 'Authentication failed. Wrong password.'
        });
      } else {

        return res.json({token: jwt.sign({ email: user.username,
          fullName: user.password,
          _id: user._id},
          'RESTFULAPIs'),
        });
      }
    }
  };

  exports.loginRequired = function(req, res, next) {

    if (req.user) {

      next();
    } else {

      return res.json({ message: 'Unauthorized user!' });
    }
  };