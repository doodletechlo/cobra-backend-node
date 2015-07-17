// 3rd party depedencies
var express = require('express');
var request = require('request');
var exec = require('child_process').exec;
var q = require('q');
var debug = require('debug')('main');
var router = express.Router();

// private dependencies
var user = require('./user');

router.post('/validate', function(req, res, next) {
    debug('entered login', req.body);
    user.validate(req.body).then(
        function(token) {
            res.json(token);
        },
        function(err) {
            res.status(401).json(err);

        });
});

router.post('/checkusername', function(req, res, next) {
    debug('entered login', req.body);
    user.utility.checkUsername(req.body).then(
        function(token) {
            res.json(token);
        },
        function(err) {
            res.status(401).json(err);

        });
});

router.post('/create', function(req, res, next) {
    debug('entered login', req.body);
    user.utility.createUser(req.body).then(
        function(token) {
            debug('created user', token);
            res.json(token);
        },
        function(err) {
            debug('error creating user', err);
            res.status(401).json(err);

        });
});

router.post('/checkpassword', function(req, res, next) {
    var params = {
        customerId: req.headers.customerId,
        password: req.body.password
    };
    user.checkPassword(params).then(
        function() {
            res.json();
        },
        function(err) {
            res.status(401).json(err);
        });
});

router.post('/updatepassword', function(req, res, next) {
    var params = {
        customerId: req.headers.customerId,
        password: req.body.password
    };
    user.utility.updatePassword(params).then(
        function(token) {
            debug('update password', token);
            res.json(token);
        },
        function(err) {
            debug('error creating user', err);
            res.status(401).json(err);

        });
});

module.exports = router;
