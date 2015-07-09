var debug = require('debug')('main');
var q = require('q');

var db = require('./data/profiledb');

module.exports = createEntry;

function createEntry(params) {
    var deferred = q.defer();
    if (params.customerId && params.email) {
        db.putItem(params).then(
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
    } else {
        deferred.reject({
            code: 'missingFields',
            description: 'Missing Fields'
        });
    }
    return deferred.promise;
}
