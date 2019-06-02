'use strict';

module.exports = (app) => {
    
    var appVer = require('../api/' + process.env.VER);

    console.log('====Root url: ' + process.env.URL);

    // Load API routes.
    app.use(process.env.URL, appVer);

    // Load products routes.
    var products = require('../routes/product.router');
    app.use(process.env.URL + '/products', products);
}