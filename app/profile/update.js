var debug = require('debug')('main');
var q = require('q');

var db = require('./data/profiledb');

module.exports = update;

function update(params) {
    var deferred = q.defer();
    db.updateItem(params).then(
        function(val) {
            deferred.resolve(val);
        },
        function(err) {
            deferred.reject({
                error: 'dataError',
                description: 'Database entry failed',
                data: err
            });
        });
    return deferred.promise;
}
