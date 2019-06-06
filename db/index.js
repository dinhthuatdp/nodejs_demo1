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

let dbfuncs = {
    open : connectWithRetry,
    close: close,
};

module.exports = dbfuncs;