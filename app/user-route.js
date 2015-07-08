// 3rd party depedencies
var express = require('express');
var request = require('request');
var exec = require('child_process').exec;
var debug = require('debug')('main');
var router = express.Router();

// private dependencies
var user = require('./user');

router.post('/login', function(req, res, next) {
    debug('entered login', req.body);
    user.db.getMemberToken(req.body).then(
        function(token) {
            res.json(token);
        },
        function(err) {
            res.status(401).json(err);

        });
});

module.exports = router;
