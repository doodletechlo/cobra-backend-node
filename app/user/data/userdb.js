var debug = require('debug')('main');
var uuid = require('node-uuid');
var bcrypt = require('bcrypt');
var q = require('q');

var common = require('../../common');
var profile = require('../../profile');

var table = 'dt-user';

module.exports = {
    scan: scan,
    putItem: putItem,
    getItem: getItem,
    updatePassword: updatePassword
};

function scan() {
    return common.db.scan(table);
}

function getItem(params){
    debug('getitem userdb', params);
    var key = {
        "customerId": {
            "S": params.customerid
        }
    };
    return common.db.getItem(key, table);
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
                    deferred.resolve({
                        customerId: customerId
                    });
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

function updatePassword(params) {
    var key = {
        customerId: {
            'S': params.customerId
        },
    };
    var expression = "set password = :val1";
    var values = {
        ':val1': {
            'S': bcrypt.hashSync(params.password, 8)
        }
    };

    return common.db.updateItem(key, expression, values, table);
}

