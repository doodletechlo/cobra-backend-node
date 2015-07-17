var debug = require('debug')('main');
var bcrypt = require('bcrypt');
var q = require('q');

var db = require('./data/userdb');

module.exports = checkPassword;

function checkPassword(params) {
    var deferred = q.defer();
    db.getItem(params).then(function(data) {
        debug('checkpassword func, user ', data, params);
        if (bcrypt.compareSync(params.password, data.password)) {
            deferred.resolve();
        } else {
            deferred.reject();
        }

    }, function(err) {
        debug('error', err);
        deferred.reject(err);
    });
    return deferred.promise;
}
