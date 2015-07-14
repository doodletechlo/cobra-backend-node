var debug = require('debug')('main');
var uuid = require('node-uuid');
var bcrypt = require('bcrypt');
var q = require('q');

var common = require('../../common');

var table = 'dt-token';

module.exports = {
    putItem: putItem,
    getItem: getItem
};

function scan() {
    return common.db.scan(table);
}

function getItem(params){
    var key = {
        "token": {
            "S": params.token
        }
    };
    return common.db.getItem(key, table);
}

function putItem(params) {
    var deferred = q.defer();
    if (params.customerId) {
        var token = uuid.v4();
        var item = {
            customerId: {
                'S': params.customerId
            },
            token: {
                'S': token
            },
            createDate: {
                'S': new Date().toString()
            },
            updateDate: {
                'S': new Date().toString()
            }
        };
        debug('create token in tokendb', item);
        common.db.putItem(item, table).then(
            function(val) {
                deferred.resolve({
                    token: token
                });
            },
            function(err) {
                deferred.reject(err);
            });
    } else {
        deferred.reject();
    }

    return deferred.promise;

}
