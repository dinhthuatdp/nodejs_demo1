'use strict';

var jsonwebtoken = require('jsonwebtoken');

module.exports = (app) => {
    
    // try {
        // Run the first if has request.
        app.use(process.env.URL, function(req, res, next) {

            console.log('originalUrl: ' + req.originalUrl);
            console.log('Url: ' + req.url);
            if (req.url == "/auth/signin") {

                return    next();
            }


            console.log('First run-----:' + req.headers.authorization);
            if (req.headers &&
                req.headers.authorization &&
                req.headers.authorization.split(' ')[0] === 'Bearer') {

                    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
                    if (err) req.user = undefined;
                    console.log('Token existed.');
                    req.user = decode;
                    next();
                });
            } else {
                console.log('Token null.');
                req.user = undefined;
                res.status(500).json({error:'login is required'});
            }
        });

        var appVer = require('../api/' + process.env.VER);

        console.log('====Root url: ' + process.env.URL);
    
        // Load API routes.
        app.use(process.env.URL, appVer);
    
        // Load products routes.
        var products = require('../routes/product.router');
        app.use(process.env.URL + '/products', products);
    
        // User routes.
        var userRouter = require('../routes/user.router');
        app.use(process.env.URL + '/auth', userRouter);
        
    // } catch (err) {
        
    //     console.log('Router error:' + err);
    // }
}