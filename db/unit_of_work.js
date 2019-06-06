'use strict';

var mongoose = require('mongoose');

async function find(model) {
    try {

        var state = mongoose.connection.readyState;
        console.log('=======readyState: ' + state);
        /*
        mongoose.connection.readyState:
        0: disconnected
        1: connected
        2: connecting
        3: disconnecting
        */
        if (state == 0) {
            console.log('=======state is zerooooo ');
            return null;
        }
    
        return await model.find({}, async function(err, products) {
            
            if (err) {
                console.log('error: ' + err);
                return;
            }
            
            console.log('mongoose readyState in find: ' + mongoose.connection.readyState);
        });
    } catch (err) {
        console.log('find error: ' + err);
        return;
    }
}

async function findOne(model, query) {
    try {

        var state = mongoose.connection.readyState;
        console.log('=======readyState: ' + state);
        /*
        mongoose.connection.readyState:
        0: disconnected
        1: connected
        2: connecting
        3: disconnecting
        */
        if (state == 0) {
            console.log('=======state is zerooooo ');
            return null;
        }
    
        return await model.findOne(query, async function(err, result) {
            
            if (err) {
                console.log('error: ' + err);
                return;
            }
            
            console.log('mongoose readyState in find: ' + mongoose.connection.readyState);
        });
    } catch (err) {
        console.log('find error: ' + err);
        return;
    }
}

async function findById(model, id) {
    try {

        var state = mongoose.connection.readyState;
        if (state == 0) {
            console.log('=======state is zerooooo ');
            return null;
        }
    
        return await model.findById(id, async function(err, products) {
            
            if (err) {
                console.log('error: ' + err);
                return;
            }
            
            //await close(mongoose);
            console.log('mongoose readyState in find: ' + mongoose.connection.readyState);
        });
    } catch (err) {
        console.log('find error: ' + err);
        return;
    }
}

async function save(model, callback) {
    try {

        return await model.save(function(err, result) {
            if (err) {
                console.log('save error---: ' + err);
                callback(err);
            } else {
                console.log('save success: ' + result);
                callback(result);
            }
        });
    } catch (error) {

        return 900;
    }
}

let db = {
    find: find,
    findById: findById,
    save: save,
    findOne: findOne,
}

module.exports = db;