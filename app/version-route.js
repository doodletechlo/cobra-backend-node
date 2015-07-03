// 3rd party depedencies
var express = require('express');
var exec = require('child_process').exec;
var debug = require('debug')('main');
var router = express.Router();

router.get('/', function(req, res, next) {
    exec('git log --stat -1', function(error, stdout, stderr) {
        if (error) {
            res.status(404);
        } else {
            res.status(200);
        }

        res.send('<div style="white-space: pre">' + stdout + '</div>');
    });
});

module.exports = router;
