var debug = require('debug')('main');
var uuid = require('node-uuid');
var bcrypt = require('bcrypt');
var q = require('q');

var common = require('../common');

var table = 'dt-user';

module.exports = {
    getMemberToken: getMemberToken
};

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

function createUser(params) {

    if (params.password && params.username) {
        bcrypt.hash(params.password, 8, function(err, hash) {
            var item = {
                username: {
                    'S': params.username
                },
                customerId: {
                    'S': uuid.v4()
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
            common.db.putItem(item, table);
        });
    }

}
