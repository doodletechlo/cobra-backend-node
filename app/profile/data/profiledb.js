var debug = require('debug')('main');
var q = require('q');

var common = require('../../common');

var table = 'dt-profile';

module.exports = {
    scan: scan,
    putItem: putItem,
    getItem: getItem
};

function scan() {
    return common.db.scan(table);
}

function getItem(params){
    debug('getitem profiledb', params);
    var key = {
        "customerId": {
            "S": params.customerId
        }
    };
    return common.db.getItem(key, table);
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
