// 3rd party depedencies
var express = require('express');
var request = require('request');
var exec = require('child_process').exec;
var q = require('q');
var debug = require('debug')('main');
var router = express.Router();

// private dependencies
var user = require('./user');

router.post('/login', function(req, res, next) {
    debug('entered login', req.body);
    user.getMemberToken(req.body).then(
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
    user.create(req.body).then(
        function(token) {
            debug('created user', token);
            res.json(token);
        },
        function(err) {
            debug('error creating user', err);
            res.status(401).json(err);

        });
});
module.exports = router;
