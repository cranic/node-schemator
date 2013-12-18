[![Build Status](https://travis-ci.org/cranic/node-schemator.png)](https://travis-ci.org/cranic/node-schemator)
![Dependencies Status](https://david-dm.org/cranic/node-schemator.png)
[![Gittip](http://img.shields.io/gittip/cranic.png)](https://www.gittip.com/cranic)

[![NPM Status](https://nodei.co/npm/schemator.png?downloads=true)](http://npmjs.org/package/schemator)


## Schemator

Schemator is a simple object validation and sanitization tool, builded from
ground up to support asynchronous validation and sanitization methods.

With Schemator, you can validate reCaptcha's input data, verify if the specific
file exists or even call your database and validade the user's input data against
your stored data.

#### Usage

Schemator is easy to use, all you need to do is to build an object with all keys
that you would like to validade in the original object, just like this:

```javascript
var Schemator = require('schemator');

// Remember to add the 'type' validation method in every key that needs validation,
// that's how Schemator know what key needs validation and what key doesn't.
var schema = new Schemator({
    name : {
        type: ['string', 'Your name must be a string.'],
        maxLength: [10, 'Your name must contain a maximum of 10 characters.'],
        minLength: [5, 'You name must contain a minimum of 5 characters.'],
        notEmpty: 'You must type your name.'
    },
    address : {
        street : {
            type: ['string', 'Your street must be a string.'],
            notEmpty : 'You must type your street.'
        },
        number : {
            type: ['integer', 'Your street number must be an integer.'],
            notEmpty : 'You must type your street\'s number.',
            sanitize : {
                convertTo : 'integer'
            }
        }
    }
});

// Time to validade against some data
var data = {
    name : 'Alan',
    address : {
        'street' : 'Beer Street'
    }
};

schema.validate(data, function(err, invalid, result){
    if(err)
        throw err; // some system error occurred

    if(invalid)
        console.log('You got invalid fields', invalid);

    if(result)
        console.log('Please write this to the database', result);
});
```

After this, you should get `undefined` on `err` param, also `undefined` in the
`result` param and an array of errors in the `invalid` param, just like this:

```javascript
[
    [['street', 'number'], 'Your street number must be an integer'],
    [['street', 'number'], 'You must type your street\'s number.']
]
```

As you can see the invalid array consists in two elements, first another array
with the path to the invalid field and a second argument with the error message.

#### Validators

Those are all validators that you can use out of the box when installing Schemator:

* __type__

    Validates the type of the received value, needs an array as the configuration
    with the name of the type and an error message. The type can be: `string`, `array`,
    `function`, `object`, `integer`, `boolean`, `float`, `number`, `any`. Ex.:

    `type : ['array', 'Your post\'s tags needs to be an array.']`

* __minLength__

    Validates the minimum length that a `string` or an `array` can have. The
    config must be an array with a number and an error message. Ex.:

    `minLength : [10, 'Your name must have at least 10 characters.']`

* __maxLength__

    Validates the maximum length that a `string` or an `array` can have. The
    config must be an array with a number and an error message. Ex.:

    `minLength : [30, 'Your name must have a maximum of 10 characters.']`

* __exactLength__

    Validates the exact length that a `string` or an `array` must have. The
    config must be an array with a number and an error message. Ex.:

    `exactLength : [8, 'Your postal code must have 8 characters.']`


#### MIT License

Copyright (c) 2009-2013 Cranic Tecnologia e Informática LTDA

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
