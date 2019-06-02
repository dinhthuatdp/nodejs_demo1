'use strict';

//require('custom-env').env('staging');
let config_data = null;

module.exports = function() {
    // If the static data was already set. return it.
    console.log('config_data===========: ' + config_data);
    if(config_data != null && config_data != undefined) {

        console.log('config_data is exited.');
        return config_data;
    }
        
    config_data = {};
    // LOAD JSON.
    console.log('NODE_ENV: ' + process.env.NODE_ENV.toString());
    console.log('typeof NODE_ENV: ' + typeof(process.env.NODE_ENV));
    if(process.env.NODE_ENV === undefined ||
        process.env.NODE_ENV == null ||
        process.env.NODE_ENV == 'development') {

        console.log('config.development.json');
        require('custom-env').env();
        config_data = require('./config.development.json');
    } else {

        if(process.env.NODE_ENV == 'production') {

            console.log('config.production.json');
            // Get env.
            require('custom-env').env('production');
            config_data = require('./config.production.json');
        }
        else if (process.env.NODE_ENV == "staging") {

            console.log('+++++config.staging.json+++++++');
            // Get env
            require('custom-env').env('staging');
            config_data = require('./config.staging.json');
        }
        else if (process.env.NODE_ENV == 'testing') {
            
            console.log('config.testing.json');
            require('custom-env').env('testing');
            config_data = require('./config.testing.json');
        } else {
            console.log('xxxxxxxxxxxxxxx');
        }
    }

    //LOAD FROM ENV VARIABLES.
    config_data.config_id = process.env.CONFIG_ID || config_data.config_id;
    config_data.app_name = process.env.APP_NAME || config_data.app_name;
    config_data.app_desc = process.env.APP_DESC || config_data.app_desc;
    config_data.port = process.env.PORT || config_data.port;
    config_data.json_indentitaion = process.env.JSON_INDENTITATION || config_data.json_indentitaion;
    config_data.database = process.env.DATABASE || config_data.database;
    config_data.db_user = process.env.DB_USER || config_data.db_user;
    config_data.db_pass = process.env.DB_PASS || config_data.db_pass;
    config_data.ver = process.env.VER || config_data.version;
    config_data.url = process.env.URL || config_data.url;
    config_data.db_host = process.env.DB_HOST || config_data.db_host;
    
    console.log("CONFIG_ID: " + process.env.CONFIG_ID);
    console.log("APP_NAME: " + process.env.APP_NAME);
    console.log("APP_DESC: " + process.env.APP_DESC);
    console.log("POST: " + process.env.PORT);
    console.log("JSON_INDENTITATION: " + process.env.JSON_INDENTITATION);
    console.log("DATABASE: " + process.env.DATABASE);
    console.log("DB_PASS: " + process.env.DB_PASS);
    console.log("DB_USER: " + process.env.DB_USER);
    console.log("VER: " + process.env.VER);
    console.log("URL: " + process.env.URL);
    console.log("DB_HOST: " + process.env.DB_HOST);

    return config_data;
}