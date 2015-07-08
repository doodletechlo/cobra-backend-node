var debug = require('debug')('main');
var uuid = require('node-uuid');
var q = require('q');

var common = require('../../common');

var table = 'dt-profile';

module.exports = {
    createEntry: createEntry,
    checkEmail: checkEmail
};

function createEntry(params) {
    var deferred = q.defer();
    if (params.customerId && params.email) {
        checkEmail(params.email).then(
            function() {
                putItem(params).then(
                    function(val) {
                        deferred.resolve(val);
                    },
                    function(err) {
                        deferred.reject({
                            code: 'dataError',
                            description: 'Database entry failed',
                            data: err
                        });
                    });
            },
            function() {
                deferred.reject({
                    code: 'emailTaken',
                    description: 'Email is taken'
                });
            });
    } else {
        deferred.reject({
            code: 'missingFields',
            description: 'Missing Fields'
        });
    }
    return deferred.promise;
}

function checkEmail(email) {
    var response = true;
    var deferred = q.defer();
    common.db.scan(table).then(function(val) {
        val.forEach(function(val) {
            if (val.email === email) {
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

function putItem(params) {
    var item = {
        username: {
            'S': params.username
        },
        customerId: {
            'S': params.customerId
        },
        firstName: {
            'S': params.firstName
        },
        lastName: {
            'S': params.lastName
        },
        email: {
            'S': params.email
        },
        createDate: {
            'S': new Date().toString()
        },
        updateDate: {
            'S': new Date().toString()
        }
    };

    return common.db.putItem(item, table);
}
