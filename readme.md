[![Build Status](https://travis-ci.org/cranic/node-schemator.png)](https://travis-ci.org/cranic/node-schemator)
[![Dependencies Status](https://david-dm.org/cranic/node-schemator.png)](https://david-dm.org/cranic/node-schemator)
[![Gittip](http://img.shields.io/gittip/cranic.png)](https://www.gittip.com/cranic)

[![NPM Status](https://nodei.co/npm/schemator.png?downloads=true)](http://npmjs.org/package/schemator)


## Schemator

Schemator is a schema validation and sanitization tool, builded from
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
// that's how Schemator knows what key needs validation and what key doesn't.
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
            type: ['number', 'Your street\'s number must be a number.'],
            notEmpty : 'You must type your street\'s number.',
            sanitize : {
                toString : true
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

schema.run(data, function(err, invalid, result){
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
    [['street', 'number'], 'type', 'Your street\'s number must be an integer'],
    [['street', 'number'], 'notEmpty', 'You must type your street\'s number.']
]
```

As you can see the invalid array consists in tree elements, first another array
with the path to the invalid field, the name of the rule that had invalidated the
path and the last one is the error message.

#### Validators

Those are all validators that you can use out of the box when installing Schemator:

* __type__

    Validates the type of the received value, needs an string representing the type
    or an array with the name of the type and an error message. The type can be:
    `string`, `array`, `object`, `number`, `boolean`, `any`. Ex.:

    `type : ['array', 'Your post\'s tags needs to be an array.']`

    You may also pass more than one type, like this:

    `type : [['object', 'array'], 'Your post\'s tags needs to be an array or an object']`

* __minLength__

    Validates the minimum length that a `string` or an `array` can have. The
    config must be a number representing de minimum length, or an array with a number
    and an error message. Ex.:

    `minLength : [10, 'Your name must have at least 10 characters.']`

* __maxLength__

    Validates the maximum length that a `string` or an `array` can have. The
    config must be a number representing the maximum length or an array with a number
    and an error message. Ex.:

    `minLength : [30, 'Your name must have a maximum of 10 characters.']`

* __betweenLength__

    Validates the maximum and minimum length that a `string` or an `array` can have.
    The config must be an array with a minimum number, maximum number and, optionally,
    an error message. Ex.:

    `betweenLength : [8, 12, 'Your password must have between 8 and 12 characters.']`

* __exactLength__

    Validates the exact length that a `string` or an `array` must have. The
    config must be an number with the exact length or an array with a number and
    an error message. Ex.:

    `exactLength : [8, 'Your postal code must have 8 characters.']`

* __notEmpty__

    An empty string, string with only spaces or linebreaks, empty `[]`, `undefined`
    values, empty `{}`, are considered empty. The config must be `true` or an
    string with an error message. Ex.:

    `notEmpty : 'Your must type something in your name.'`

* __alpha__

    Validate a `string` that need to have just alpha characters, case insensitive.
    Strings with spaces special characteres, numbers, spaces, etc, will fail in this test.
    The config must be `true` or a string with an error message. Ex.:

    `alpha : 'Your username must contain just alpha characteres.'`

* __alphanumeric__

    Validate a `string` that need to have just letter and numbers, case insensitive.
    Strings with spaces special characteres, spaces, etc, will fail in this test.
    The config must be `true` or an string with an error message. Ex.:

    `alphanumeric : 'Your secret code must contain only letter and numbers.'`

* __digit__

    Validate a `string` that need to have just numbers. Strings with spaces, special
    characteres, letters, etc, will fail in this test. The config must `true` or a
    string with an error message. Ex.:

    `digit : 'Your postal code must contain only digits.'`

* __min__

    Validates the minimum value that a `number` can have. The config must be
    a number representing the minimum or an array with a number and a string
    as the error message. Ex.:

    `min : [2, 'You must have at least 2 apples in your pockets.']`

* __max__

    Validates the maxium value that a `number` can have. The
    config must be a number representing the maximum value or an array with a number
    and an error message. Ex.:

    `max : [5, 'You can have a maximum of 5 apples in your pokets.']`

* __between__

    A `integer`, `decimal` or a `number` must be between two values, including
    those two numbers. The config must be an array with a minimum number, maximum number
    and optionally, an error message. Ex.:

    `between : [18, 74, 'Your age must be between 18 and 74.']`

* __email__

    Check if a `string` contains a valid e-mail address. The config must be `true`
    or a string with an error message. Ex.:

    `email : 'You must type a valid e-mail address.'`

* __regex__

    Test a `string` agains a regular expression. The config must be a regex or
    an array with a regular expression and an error message. Ex.:

    `regex : [/Jhon/, 'Your name must contain Jhon.']`

* __equalTo__

    Test if a key have the same value as another key in the object being validated.
    The config must contain the path to the other value in the form of dot notation
    (ex. 'deep.key.inside.the.object') or as an array (ex. ['deep', 'key', 'can.contain', 'dots']).
    You can also pass a custom error message, but the path *MUST* be represented
    as an array.

    `equalTo : [['password_check'], 'The passwords didn\'t matched.']`

* __notEqualTo__

    Fails if a key have the same value as another key in the object being validated.
    The config must contain the path to the other value in the form of dot notation
    (ex. 'deep.key.inside.the.object') or as an array (ex. ['deep', 'key', 'can.contain', 'dots']).
    You can also pass a custom error message, but the path *MUST* be represented
    as an array.

    `notEqualTo : ['surname', 'Your name and your surname must be different.']`

* __inList__

    Check if a key have an allowed value. The config must be an array of
    allowed values or an array with an array of allowed values as the first
    element and an error message. Ex.:

    `inList : [['male', 'female'], 'You must choose male or female.']`

* __notInList__

    Check if a key have an allowed value. The config must be an array of
    unallowed values or an array with an array of unallowed values as the first
    element and an error message. Ex.:

    `inList : [['admin', 'vip'], 'The selected group can\'t be VIP or admin.']`

* __date__

    Validate a `string` against a defined date/time pattern. The config must be an
    string containing the date patern or an array with a pattern as the first element
    and an error message. Ex.:

    `date : ['YYYY-MM-DD HH:mm', 'You must type a valid date, ex. 1989-09-14 18:35']`

* __optional__

    An empty string, string with only spaces or linebreaks, empty `[]`, `undefined`
    values, empty `{}`, are considered empty and will not return any error. Ex.:

    `optional : true`

* __each__

    Validates every item inside an `array` against an Schemator's schema. Ex.:

    ```javascript
    books: {
        type : 'array',
        notEmpty : 'You must choose some books.',
        each : new Schemator({
            name : {
                type : ['string', 'Your book\'s name must be a string'],
                notEmpty : 'You must enter your book\'s name.'
            },
            author : {
                type : ['string', 'The authors\'s name must be a string'],
                notEmpty : 'You must type the author\'s name.'
            }
        })
    }
    ```

* __custom__

    Create a custom validator, you need to pass a function as the config param.
    Ex.:

    ```javascript
    custom : function(value, callback){
        if(value !== 'test')
            return callback(null, 'The value is not equal to test');

        callback(); // everything went ok
    }
    ```

#### Sanitizators

The sanitization methods runs after all validations and if no invalid field was
found. They run in series, so you can chain them.


* __default__

    Replace the value of the key if it is empty. You need to pass the default value
    as the config value. Functions can also be passed as the default value, so they
    will be evaluated on every validation, if the function contains a parameter, it will
    be evaluated as an async function.

    ```javascript
    default : funtion(callback){
        callback(null, new Date());
    }

    // or this
    default : Date.now

    // or this
    default : []
    ```

* __toString__

    Converts the value to a string. You just need to pass `true` as the config param.
    Ex.:

    `toString : true`


* __toBoolean__

    Converts the value to a boolean. You just need to pass `true` as the config param.
    Ex.:

    `toBoolean : true`

* __toNumber__

    Converts the value to a integer. You just need to pass `true` as the config param.
    Ex.:

    `toInteger : true`

* __upperCase__

    Converts a string to uppercase. You just need to pass `true` as the config param.
    Ex.:

    `uppercase : true`

* __lowerCase__

    Converts a string to lowercase. You just need to pass `true` as the config param.
    Ex.:

    `lowercase : true`

* __capitalize__

    Converts the first letter of a string to uppercase. You just need to pass true
    as the config param.

    `capitalize : true`

* __clean__

    Transform recursive spaces in one space. You just need to pass true
    as the config param.

    `clean : true`

* __escapeHTML__

    Converts HTML special characters to their entity equivalents. You just need
    to pass true as the config param.

    `escapeHTML : true`

* __unescapeHTML__

    Converts entity characters to HTML equivalents. You just need
    to pass true as the config param.

    `unescapeHTML : true`

* __titleize__

    Converts every first character from every word in the string to uppercase.
    You just need to pass true as the config param.

    `titleize : true`

* __camelize__

    Converts underscored or dasherized string to a camelized one. Begins with a
    lower case letter unless it starts with an underscore or string. You just
    need to pass true as the config param.

    `camelize : true`

* __classify__

    Converts string to camelized class name. First letter is always upper case.
    You just need to pass true as the config param.

    `classify : true`

* __underscored__

    Converts a camelized or dasherized string into an underscored one. You just
    need to pass true as the config param.

    `underscored : true`

* __dasherize__

    Converts a underscored or camelized string into an dasherized one. You just
    need to pass true as the config param.

    `dasherize : true`

* __humanize__

    Converts an underscored, camelized, or dasherized string into a humanized one.
    Also removes beginning and ending whitespace, and removes the postfix '_id'.
    You just need to pass true as the config param.

    `humanize : true`

* __trim__

    Trims defined characters from the begining and ending of the string. Defaults to
    whitespace characters. You can pass an string whith the characters to trim or
    `true` to trim just whitespaces.

    `trim : '-_ '`

* __ltrim__

    Trims defined characters from the begining of the string. Defaults to
    whitespace characters. You can pass an string whith the characters to trim or
    `true` to trim just whitespaces.

    `ltrim : '-_ '`

* __rtrim__

    Trims defined characters from the ending of the string. Defaults to
    whitespace characters. You can pass an string whith the characters to trim or
    `true` to trim just whitespaces.

    `rtrim : '-_ '`

* __truncate__

    Truncate de string. You need to pass an array with the maximum size of the
    string and the truncate characteres.

    ```javascript
    truncate : [20, '...']

    // or this
    truncate : 20

    // or this
    truncate : [10, '-->']
    ```

* __prune__

    Elegant version of truncate, this wont chop words in half. You need to pass
    an array with the maximum size of the string and the truncate characteres.

    ```javascript
    prune : [20, '...']

    // or this
    prune : 20

    // or this
    prune : [10, '-->']
    ```


* __dateTransform__

    Transforms a date pattern into another one. You need to pass
    an array with the expected pattern and the final pattern.

    `dateTransform : ['YYYY-MM-DD HH:mm:ss', 'MM/DD/YYYY']`

* __hash__ (Node.js only)

    Hash a string with the given algorithm. You need to pass
    an algorithm as the config and optionaly a salt.

    ```
    hash : 'md5'

    // or this
    hash : ['sha1', 'mySecretHash']
    ```

* __remove__

    Removes the key from the final object. You just need to pass
    true as the config.

    `remove : true`

* __pbkdf2__ (Node.js only)

    Hash a string with the PBKDF2 algorithm. You need to pass the salt, the
    number of iteration and the desired hash lenght
    true as the config.

    `pbkdf2 : ['mySecretSalt', 1000, 520]`

* __custom__

    Create a custom sanitizator, you need to pass a function as the config param.
    Ex.:

    ```javascript
    custom : function(value, callback){
        // do something with value
        callback(null, value);
    }
    ```


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
