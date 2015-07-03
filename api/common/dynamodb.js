var AWS = require('aws-sdk');
var debug = require('debug')('main');
var q = require('q');
var dataHelper = require('./dataHelper');
AWS.config.update({
    region: 'us-west-2'
});

var db = new AWS.DynamoDB();

module.exports = {
    scan: scan,
    getItem: getItem,
    putItem: putItem
};

function getItem(key, table) {
    var deferred = q.defer();

    var params = {
        TableName: table,
        Key: key
    };

    db.getItem(params, function(err, data) {
        if (err) {
            deferred.reject(err);
        } else {
            try {
                dataHelper.removeKey(data.Item);
                deferred.resolve(data.Item);
            } catch (e) {
                deferred.reject(e);
            }
        }
    });
    return deferred.promise;
}

function scan(table) {
    var deferred = q.defer();
    var params = {
        TableName: table
    };
    db.scan(params, function(err, data) {
        if (err) {
            deferred.reject(err);
        } else {
            dataHelper.removeKey(data.Items);
            deferred.resolve(data.Items);
        }
    });
    return deferred.promise;
}

function putItem(item, table) {
    var deferred = q.defer();

    db.putItem({
        TableName: table,
        Item: item
    }, function(err, data) {
        debug('putitem: ', err, data);
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(data);
        }

    });
    return deferred.promise;
}
