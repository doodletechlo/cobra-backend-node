var debug = require('debug')('main');
var q = require('q');

var db = require('./data/userdb');

module.exports = {
    checkUsername: checkUsername,
    createUser: createUser,
    updatePassword: updatePassword,
};

function checkUsername(params) {
    var response = true;
    var deferred = q.defer();
    db.scan().then(function(data) {
        data.forEach(function(user) {
            if (user.username === params.username) {
                response = false;
            }
        });
        if (response) {
            deferred.resolve();
        } else {
            deferred.reject({
                error: 'usernameTaken',
                description:'Username taken'
            });
        }
    });
    return deferred.promise;
}

function createUser(params){
    return db.putItem(params);
}

function updatePassword(params){
    return db.updatePassword(params);
}
