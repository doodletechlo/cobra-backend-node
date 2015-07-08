var AWS = require('aws-sdk');
var debug = require('debug')('main');
var s3 = new AWS.S3();

function insert(key, body) {
    var params = {
        Bucket: 'dt-cobra-logs',
        Key: new Date().getTime().toString() + key.replace(/\//g, '.'),
        Body: body
    };

    debug('logging.js', params.Key);
    s3.putObject(params, function(err, data) {
        if (err) {
            console.log('logging.js', err);
        } else {
            console.log("Successfully uploaded data to", key, body);
        }
    });
}

module.exports = {
    insert: insert
};
