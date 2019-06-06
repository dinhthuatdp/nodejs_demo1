'use strict';

var mongoose = require('mongoose');

const Schema = mongoose.Schema;

var BaseSchema = new Schema({
    created: { type: Date, default: Date.now() },
    deleteAt: { type: Date, default: Date.now() },
    _id: { type: Number, required: true },
});

module.exports = BaseSchema;