'use strict';

var mongoose = require('mongoose');
var assert = require('assert');

var dbUrl = 'mongodb://127.0.0.1:27017/mydb';

var connectWithRetry = async function open() {

    try {
        var db = await mongoose.connect(dbUrl, { useNewUrlParser: true}, (err) => {
            if (err) {
                console.log('Failed to connect to mongo on startup - retrying in 5 sec', err);
                setTimeout(connectWithRetry, 5000);
            }
        });
        console.log("DB opened: " + db);
        return db;
    } catch (err) {
        console.log('Connect DB error: ' + err);
        return null;
    }
}

process.on('SIGINT', function() {
    // If the Node process ends, close the Mongoose connection.
    mongoose.connection.close(function () {
        
        console.log('Mongoose default connection disconnected through app termination'); 
        process.exit(0); 
    });
});

async function close(db) {
    // Close connection.
    if (db) {
        console.log('Close connection: ' + db);
        await db.connection.close();
    }
}

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
            
            //await close(mongoose);
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

async function save(model, product) {
    try {
        
        var p = await findById(model, product.id);
        if (p) {
            // 'Data existed in DB.'
            return 901;
        }

        return product.save();
    } catch (error) {

        return 900;
    }
}

let dbfuncs = {
    open : connectWithRetry,
    close: close,
    find: find,
    findById: findById,
    save: save,
};

module.exports = dbfuncs;