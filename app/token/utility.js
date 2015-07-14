var debug = require('debug')('main');
var q = require('q');

var db = require('./data/tokendb');

module.exports = {
    createToken: createToken,
    getUser: getUser
};

function createToken(params){
    return db.putItem(params);
}

function getUser(params){
    return db.getItem(params);
}
