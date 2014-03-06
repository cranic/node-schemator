var assert = require('assert');
var val = require(__dirname + '/../lib/validations');
var mock = require(__dirname + '/mock/validation');

describe('Testing validation methods', function(){
    describe('#type testing', function(){
        it('Should accept string when string', function(callback){
            mock(val.type, 'value', ['string'], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should not accept undefined when string', function(callback){
            mock(val.type, undefined, ['string'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept number when string', function(callback){
            mock(val.type, 0, ['string'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept object when string', function(callback){
            mock(val.type, {}, ['string'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept array when string', function(callback){
            mock(val.type, [], ['string'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept boolean when string', function(callback){
            mock(val.type, true, ['string'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept function when string', function(callback){
            mock(val.type, function(){}, ['string'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should accept array when array', function(callback){
            mock(val.type, [], ['array'], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should not accept undefined when array', function(callback){
            mock(val.type, undefined, ['array'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept number when array', function(callback){
            mock(val.type, 0, ['array'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept object when array', function(callback){
            mock(val.type, {}, ['array'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept string when array', function(callback){
            mock(val.type, '', ['array'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept boolean when array', function(callback){
            mock(val.type, true, ['array'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept function when array', function(callback){
            mock(val.type, function(){}, ['array'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should accept object when object', function(callback){
            mock(val.type, {}, ['object'], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should not accept undefined when object', function(callback){
            mock(val.type, undefined, ['object'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept number when object', function(callback){
            mock(val.type, 0, ['object'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept array when object', function(callback){
            mock(val.type, [], ['object'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept string when object', function(callback){
            mock(val.type, '', ['object'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept boolean when object', function(callback){
            mock(val.type, true, ['object'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not function when object', function(callback){
            mock(val.type, function(){}, ['object'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should accept number when number', function(callback){
            mock(val.type, 10.21, ['number'], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should not accept undefined when number', function(callback){
            mock(val.type, undefined, ['number'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept object when number', function(callback){
            mock(val.type, {}, ['number'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept array when number', function(callback){
            mock(val.type, [], ['number'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept string when number', function(callback){
            mock(val.type, '10', ['number'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept boolean when number', function(callback){
            mock(val.type, true, ['number'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept function when number', function(callback){
            mock(val.type, function(){}, ['number'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should accept boolean when boolean', function(callback){
            mock(val.type, true, ['boolean'], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should not accept undefined when boolean', function(callback){
            mock(val.type, undefined, ['boolean'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept object when boolean', function(callback){
            mock(val.type, {}, ['boolean'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept array when boolean', function(callback){
            mock(val.type, [], ['boolean'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept string when boolean', function(callback){
            mock(val.type, '10', ['boolean'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept number when boolean', function(callback){
            mock(val.type, 10, ['boolean'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not accept function when boolean', function(callback){
            mock(val.type, function(){}, ['boolean'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should accept undefined when any', function(callback){
            mock(val.type, undefined, ['any'], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should accept object when any', function(callback){
            mock(val.type, {}, ['any'], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should accept array when any', function(callback){
            mock(val.type, [], ['any'], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should accept string when any', function(callback){
            mock(val.type, '00', ['any'], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should accept number when any', function(callback){
            mock(val.type, 10, ['any'], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should accept function when any', function(callback){
            mock(val.type, function(){}, ['any'], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should allow custom messages', function(callback){
            mock(val.type, function(){}, ['string', 'custom error'], function(err, result){
                assert.ok(result.invalid[0][2] === 'custom error');
                callback();
            });
        });

    });

    describe('#notEmpty testing', function(){
        it('Empty string should be invalid', function(callback){
            mock(val.notEmpty, '', ['custom error'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Empty string with line breaks and spaces should be invalid', function(callback){
            mock(val.notEmpty, '     \r \n\r', ['custom error'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Not empty strings should be valid', function(callback){
            mock(val.notEmpty, 'Hello world', ['custom error'], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Empty arrays should be invalid', function(callback){
            mock(val.notEmpty, [], ['custom error'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Not empty arrays should be valid', function(callback){
            mock(val.notEmpty, ['Hello world'], ['custom error'], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Empty objects should be invalid', function(callback){
            mock(val.notEmpty, {}, ['custom error'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Not empty objects should be valid', function(callback){
            mock(val.notEmpty, {hello : 'world'}, ['custom error'], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Numbers should be valid', function(callback){
            mock(val.notEmpty, 0, ['custom error'], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Function should be valid', function(callback){
            mock(val.notEmpty, function(){}, ['custom error'], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Boolean should be valid', function(callback){
            mock(val.notEmpty, false, ['custom error'], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Undefined should be invalid', function(callback){
            mock(val.notEmpty, undefined, ['custom error'], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should allow custom messages', function(callback){
            mock(val.notEmpty, undefined, ['custom error'], function(err, result){
                assert.ok(result.invalid[0][2] === 'custom error');
                callback();
            });
        });
    });

    describe('#minLength testing', function(){
        it('Should be able to error with strings', function(callback){
            mock(val.minLength, 'l', [2], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should be able to error with arrays', function(callback){
            mock(val.minLength, [], [2], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should be able to validate strings', function(callback){
            mock(val.minLength, 'la3', [2], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should be able to validate arrays', function(callback){
            mock(val.minLength, [1, 2], [2], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should allow custom error messages', function(callback){
            mock(val.minLength, [1], [2, 'custom error'], function(err, result){
                assert.ok(result.invalid[0][2] === 'custom error');
                callback();
            });
        });
    });

    describe('#maxLength testing', function(){
        it('Should be able to error with strings', function(callback){
            mock(val.maxLength, 'l', [0], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should be able to error with arrays', function(callback){
            mock(val.maxLength, [1], [0], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should be able to validate strings', function(callback){
            mock(val.maxLength, 'la3', [3], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should be able to validate arrays', function(callback){
            mock(val.maxLength, [1, 2], [2], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should allow custom error messages', function(callback){
            mock(val.maxLength, [1, 2, 3], [2, 'custom error'], function(err, result){
                assert.ok(result.invalid[0][2] === 'custom error');
                callback();
            });
        });
    });

    describe('#betweenLength testing', function(){
        it('Should be able to error with strings', function(callback){
            mock(val.betweenLength, 'l123', [1, 2], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should be able to error with arrays', function(callback){
            mock(val.betweenLength, [1, 2, 3], [1, 2], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should be able to validate strings', function(callback){
            mock(val.betweenLength, 'la3', [1, 4], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should be able to validate arrays', function(callback){
            mock(val.betweenLength, [1, 2], [1, 2], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should allow custom error messages', function(callback){
            mock(val.betweenLength, [1, 2, 3], [6, 8, 'custom error'], function(err, result){
                assert.ok(result.invalid[0][2] === 'custom error');
                callback();
            });
        });
    });

    describe('#exactLength testing', function(){
        it('Should be able to error with strings', function(callback){
            mock(val.exactLength, 'l123', [1], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should be able to error with arrays', function(callback){
            mock(val.exactLength, [1, 2, 3], [1], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should be able to validate strings', function(callback){
            mock(val.exactLength, 'la3', [3], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should be able to validate arrays', function(callback){
            mock(val.exactLength, [1, 2], [2], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should allow custom error messages', function(callback){
            mock(val.exactLength, [1, 2, 3], [6, 'custom error'], function(err, result){
                assert.ok(result.invalid[0][2] === 'custom error');
                callback();
            });
        });
        it('Should allow custom error messages', function(callback){
            mock(val.exactLength, [1, 2, 3], [6, 'custom error'], function(err, result){
                assert.ok(result.invalid[0][2] === 'custom error');
                callback();
            });
        });
    });

    describe('#alpha testing', function(){
        it('Should invalidate strings with numbers', function(callback){
            mock(val.alpha, 'l123', [], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should invalidate strings with other chars', function(callback){
            mock(val.alpha, 'l#', [], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should validate string with just alpha chars', function(callback){
            mock(val.alpha, 'l', [], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should allow custom messages', function(callback){
            mock(val.alpha, 'l1', ['custom error'], function(err, result){
                assert.ok(result.invalid[0][2] === 'custom error');
                callback();
            });
        });
    });

    describe('#alphanumeric testing', function(){
        it('Should invalidate strings with other chars', function(callback){
            mock(val.alphanumeric, 'l#', [], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should validate string with just alpha chars', function(callback){
            mock(val.alphanumeric, 'l', [], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should validate string with just numeric chars', function(callback){
            mock(val.alphanumeric, '1', [], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should allow custom messages', function(callback){
            mock(val.alphanumeric, '#', ['custom error'], function(err, result){
                assert.ok(result.invalid[0][2] === 'custom error');
                callback();
            });
        });
    });

    describe('#digit testing', function(){
        it('Should invalidate strings with alpha', function(callback){
            mock(val.digit, 'l123', [], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should invalidate strings with other chars', function(callback){
            mock(val.digit, '1#', [], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should validate string with just digit chars', function(callback){
            mock(val.digit, '1', [], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should allow custom messages', function(callback){
            mock(val.digit, 'l1', ['custom error'], function(err, result){
                assert.ok(result.invalid[0][2] === 'custom error');
                callback();
            });
        });
    });

    describe('#min testing', function(){
        it('Should be able to invalidate smaller numbers', function(callback){
            mock(val.min, 9, [10], function(err, result){
                assert.ok(result.invalid.length === 1);
                callback();
            });
        });
        it('Should not invalidate bigger numbers', function(callback){
            mock(val.min, 11, [10], function(err, result){
                assert.ok(result.invalid.length === 0);
                callback();
            });
        });
        it('Should allow custom messages', function(callback){
            mock(val.min, 9, [10, 'custom error'], function(err, result){
                assert.ok(result.invalid[0][2] === 'custom error');
                callback();
            });
        });
    });

});
