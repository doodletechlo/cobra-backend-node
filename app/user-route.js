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
        function() {
            res.end();
        },
        function(err) {
            res.status(401).end();

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
            res.status(500).json(err);

        });
});

router.post('/checkpassword', function(req, res, next) {
    var params = {
        customerId: req.headers.customerid,
        password: req.body.oldPassword
    };
    debug('checkpassword', params);
    user.checkPassword(params).then(
        function() {
            res.end();
        },
        function(err) {
            res.status(401).json(err);
        });
});

router.post('/updatepassword', function(req, res, next) {
    var params = {
        customerId: req.headers.customerid,
        password: req.body.newPassword,
    };
    debug('updatepassword route', params);
    user.utility.updatePassword(params).then(
        function(val) {
            res.end();
        },
        function(err) {
            debug('error update password', err);
            res.status(500).json(err);

        });
});

module.exports = router;
