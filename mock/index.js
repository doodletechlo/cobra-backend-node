// 3rd party depedencies
var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next) {
    res.json({
        token: 'mock-token'
    });
});

module.exports = router;
