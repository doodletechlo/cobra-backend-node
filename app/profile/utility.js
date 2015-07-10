var debug = require('debug')('main');
var q = require('q');

var db = require('./data/profiledb.js');

module.exports = {
    checkEmail: checkEmail
};

function checkEmail(params) {
    var response = true;
    var deferred = q.defer();
    db.scan().then(function(val) {
        val.forEach(function(val) {
            if (val.email.toLowerCase() === params.email.toLowerCase()) {
                response = false;
            }
        });
        if (response) {
            deferred.resolve();
        } else {
            deferred.reject({
                error: 'emailTaken',
                description:'Email taken'
            });
        }
    });
    return deferred.promise;
}
