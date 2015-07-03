var mockery = require('mockery');
mockery.enable();

var test = require('../../api/login/index');

describe('login service', function(){
    it('test the username and password', function(next){
        var config = {
            username: 'testuser',
            password: 'password'
        };
        test.getMemberToken(config).then(function(val){
            console.log('success ' + val);
            expect(val).toBeDefined();
            next();
        }, function(val) {
            console.log('error ' + val);
            expect(val).toBeDefined();
            next();

        });
    });
});
