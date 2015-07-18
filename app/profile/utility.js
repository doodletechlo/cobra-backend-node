var debug = require('debug')('main');
var q = require('q');

var db = require('./data/profiledb.js');

module.exports = {
    checkEmail: checkEmail,
    getUser: getUser,
    update: update,
    create: create
};

function getUser(params) {
    return db.getItem(params);
}

function create(params) {
    return db.putItem(params);
}

function update(params) {
    return db.updateItem(params);
}

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
            deferred.reject();
        }
    });
    return deferred.promise;
}
