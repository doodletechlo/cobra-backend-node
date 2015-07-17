// 3rd party depedencies
var express = require('express');
var request = require('request');
var q = require('q');
var debug = require('debug')('main');
var router = express.Router();

// private dependencies
var profile = require('./profile');

router.post('/checkemail', function(req, res, next) {
    debug('entered profile route: checkemail', req.body);
    profile.utility.checkEmail(req.body).then(
        function() {
            res.send('OK');
        },
        function(err) {
            res.status(401).json(err);

        });
});

router.get('/getuser', function(req, res, next) {
    debug('entered profile route: checkemail', req.headers);
    profile.utility.getUser(req.headers).then(
        function(val) {
            debug('entered profile route: getuser', val);
            res.json(val);
        },
        function(err) {
            debug('entered profile route: getuser error', err);
            res.status(404).json(err);
        });
});

router.post('/create', function(req, res, next) {
    debug('entered profile create', req.body);
    profile.create(req.body).then(
        function() {
            res.send('OK');
        },
        function(err) {
            res.status(401).json(err);

        });
});

router.post('/update', function(req, res, next) {
    var params ={
        customerId: req.headers.customerid,
        email: req.body.email
    };
    debug('entered profile update', params, req.headers);
    profile.update(params).then(
        function() {
            res.send('OK');
        },
        function(err) {
            res.status(401).json(err);

        });
});
module.exports = router;
