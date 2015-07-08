var debug = require('debug')('main');
var uuid = require('node-uuid');
var bcrypt = require('bcrypt');
var q = require('q');

var common = require('../../common');
var profile = require('../../profile');

var table = 'dt-user';

module.exports = {
    getMemberToken: getMemberToken,
    registerUser: registerUser,
    checkUsername: checkUsername
};

function checkUsername(username) {
    var response = true;
    var deferred = q.defer();
    common.db.scan(table).then(function(data) {
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

function registerUser(params) {
    var deferred = q.defer();
    if (!params.username || !params.password) {
        deferred.reject({
            code: 'missingFields',
            description: 'Missing Fields'
        });
    } else {
        checkUsername(params.username).then(function() {
            profile.db.checkEmail(params.email).then(function() {
                putItem(params).then(function(val) {
                        params.customerId = val;
                        profile.db.createEntry(params);
                        deferred.resolve('User created');
                    },
                    function(err) {
                        deferred.reject({
                            code: 'dataError',
                            description: 'Database entry fail'
                        });
                    });
            }, function() {
                deferred.reject({
                    code: 'emailTaken',
                    description: 'Email Taken'
                });
            });

        }, function() {
            deferred.reject({
                code: 'usernameTaken',
                description: 'Username is taken'
            });
        });
    }
    return deferred.promise;
}

function getMemberToken(params) {
    var deferred = q.defer();
    if (!params.password || !params.username) {
        deferred.reject({
            code: 'denied',
            description: 'Invalid credentials'
        });
    } else {
        var token = false;
        common.db.scan(table).then(function(data) {
            data.forEach(function(val) {
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
                    code: 'denied',
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

function putItem(params) {
    var deferred = q.defer();
    if (params.password && params.username) {
        var customerId = uuid.v4();
        bcrypt.hash(params.password, 8, function(err, hash) {
            var item = {
                username: {
                    'S': params.username
                },
                customerId: {
                    'S': customerId
                },
                password: {
                    'S': hash
                },
                createDate: {
                    'S': new Date().toString()
                },
                updateDate: {
                    'S': new Date().toString()
                }
            };
            common.db.putItem(item, table).then(
                function(val) {
                    deferred.resolve(customerId);
                },
                function(err) {
                    deferred.reject(err);
                });
        });
    } else {
        deferred.reject();
    }

    return deferred.promise;

}
