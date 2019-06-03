'use strict';

const express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var extendSchema = require('mongoose-extend-schema');
const cookieParser = require('cookie-parser');
const routes = require('./app/routes');
var mongodb = require('./db');
//var db = mongodb.open();

// Connect Db.
async function openDb() {

    const initDb = await mongodb.open();
    // Launch app to listen to specified port.
    var server = app.listen(port, function (err) {
        if (err) {
            console.log("Run RestHub error.");
            throw err;
        }
        console.log("Running RestHub on port " + port);
    });

    // Load routes.
    routes(app);
}

openDb();

// Initialize the app.
let app = express();

app.use(bodyParser.json());
// Parse URL-encoded bodies (as sent by HTML forms).
app.use(express.urlencoded({ extended: true }));

// app.use(express.json());
// app.use(cookieParser());

// Get config file.
var config = require("./config/config.js")();
var port = config.port;
var url = config.url;
var ver = config.ver;
var db_host = config.db_host;

process.env.URL = url + '/' + ver;
process.env.PORT = port;
process.env.VER = ver;
process.env.DB_HOST = db_host;

console.log('====config_data.port: ' + port + '====config_data.version: ' + ver + '====config_data.url: ' + url);

module.exports = app;