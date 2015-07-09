var debug = require('debug')('main');
var q = require('q');

var db = require('./data/userdb');

module.exports = {
    checkUsername: checkUsername,
};

function checkUsername(username) {
    var response = true;
    var deferred = q.defer();
    db.scan(table).then(function(data) {
        data.forEach(function(user) {
            if (user.username === username) {
                response = false;
            }
        });
        if (response) {
            deferred.resolve();
        } else {
            deferred.reject();
        }
    });
    return deferred.promise;
}

