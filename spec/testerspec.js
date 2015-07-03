var mockery = require('mockery');
mockery.enable();
function test(s) {
    return s + 1;
}

describe('test describe', function(){
    it('test it', function(){
        expect(test(3)).toEqual(4);
    });
});
