// 3rd party depedencies
var express = require('express');
var request = require('request');
var q = require('q');
var debug = require('debug')('main');
var router = express.Router();

// private dependencies
var profile = require('./profile');

router.post('/checkEmail', function(req, res, next) {
    debug('entered profile route: checkemail', req.body);
    profile.utility.checkEmail(req.body).then(
        function() {
            res.json();
        },
        function(err) {
            res.status(401).json(err);

        });
});

router.post('/create', function(req, res, next) {
    debug('entered profile create', req.body);
    profile.create(req.body).then(
        function() {
            res.json();
        },
        function(err) {
            res.status(401).json(err);

        });
});
module.exports = router;
