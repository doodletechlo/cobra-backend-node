var debug = require('debug')('main');
var q = require('q');

var db = require('./data/userdb');

module.exports = createUser;

function createUser(params) {
    var deferred = q.defer();
    db.putItem(params).then(
        function(val) {
            deferred.resolve(val);
        },
        function(err) {
            deferred.reject(err);
        });
    return deferred.promise;

}
