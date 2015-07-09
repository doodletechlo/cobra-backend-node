var debug = require('debug')('main');
var q = require('q');

var db = require('./data/userdb');

module.exports = createUser;

function createUser(params) {
    var deferred = q.defer();
    if (params.password && params.username) {
        db.putItem(params).then(
            function(val) {
                deferred.resolve(customerId);
            },
            function(err) {
                deferred.reject(err);
            });
    } else {
        deferred.reject({
            code: 'missingFields',
            description: 'Required Fields: username, password'
        });
    }

    return deferred.promise;

}
