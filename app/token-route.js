// 3rd party depedencies
var express = require('express');
var request = require('request');
var exec = require('child_process').exec;
var q = require('q');
var debug = require('debug')('main');
var router = express.Router();

// private dependencies
var token = require('./token');

router.post('/getToken', function(req, res, next) {
    debug('entered login', req.body);
    token.utility.createToken(req.body).then(
        function(token) {
            res.json(token);
        },
        function(err) {
            res.status(401).json(err);

        });
});

router.post('/getUser', function(req, res, next) {
    debug('entered login', req.body);
    token.utility.getUser(req.body).then(
        function(user) {
            res.json(user);
        },
        function(err) {
            res.status(401).json(err);

        });
});

module.exports = router;
