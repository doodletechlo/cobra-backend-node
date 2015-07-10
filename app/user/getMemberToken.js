var debug = require('debug')('main');
var bcrypt = require('bcrypt');
var q = require('q');

var db = require('./data/userdb');

module.exports = getMemberToken;

function getMemberToken(params) {
    var deferred = q.defer();
    if (!params.password || !params.username) {
        deferred.reject({
            error: 'missingFields',
            description: 'Required fields: username, password'
        });
    } else {
        var token = false;
        db.scan().then(function(data) {
            data.forEach(function(val) {
                debug('gettoken', params, val);
                if (bcrypt.compareSync(params.password, val.password) && params.username === val.username) {
                    token = val.customerId;
                }
            });
            if (token) {
                deferred.resolve({
                    token: bcrypt.hashSync(token, 8)
                });
            } else {
                deferred.reject({
                    error: 'denied',
                    description: 'Invalid credentials'
                });
            }
        }, function(err) {
            debug('error', err);
            deferred.reject(err);
        });
    }
    return deferred.promise;
}
