var util = require('util');
var moment = require('moment');
var async = require('async');
var helper = require(__dirname + '/helper');

exports.type = function(value, config, callback){
    var that = this;

    var msg = config[1] || util.format.apply(null, [
        '%s field didn\'t mach the type %s.',
        this.key.join('.'),
        Array.isArray(config[0]) ? config[0].join(', ') : config[0],
    ]);

    var passed = false;
    var error;

    Array.prototype.concat.call([], Array.isArray(config[0]) ? config[0] : [config[0]])
        .forEach(function(type){
            if(!helper.types[type])
                error = new Error('Unkow type' + type);
            else if(helper.types[type].call(null, value)){
                passed = true;
            }
        });

    callback(error, passed ? null : msg);
};

exports.notEmpty = function(value, config, callback){
    var msg = typeof config[0] === 'string' ? config[0] : util.format.apply(null, [
        '%s must not be empty.',
        this.key.join('.')
    ]);

    callback(null, helper.isEmpty(value) ? msg : null);
};

exports.minLength = function(value, config, callback){
    var msg = config[1] ? config[1] : util.format.apply(null, [
        '%s field needs to have %s length or more.',
        this.key.join('.'),
        config[0]
    ]);

    if(!value || value.length < config[0])
        return callback(undefined, msg);

    callback();
};

exports.maxLength = function(value, config, callback){
    var msg = config[1] ? config[1] : util.format.apply(null, [
        '%s field needs to have %s length or less.',
        this.key.join('.'),
        config[0]
    ]);

    if(!value || value.length > config[0])
        return callback(undefined, msg);

    callback();
};

exports.betweenLength= function(value, config, callback){
    var msg = config[2] ? config[2] : util.format.apply(null, [
        '%s field needs to have length between %s and %s.',
        this.key.join('.'),
        config[0],
        config[1]
    ]);

    if(!value || !(value.length >= config[0] && value.length <= config[1]))
        return callback(undefined, msg);

    callback();
};

exports.exactLength = function(value, config, callback){
    var msg = config[1] ? config[1] : util.format.apply(null, [
        '%s field needs to have the length exactly %s.',
        this.key.join('.'),
        config[0]
    ]);

    if(!value || value.length !== config[0])
        return callback(undefined, msg);

    callback();
};


exports.alpha = function(value, config, callback){
    var msg = typeof config[0] === 'string' ? config[0] : util.format.apply(null, [
        '%s field must contain just alpha characters.',
        this.key.join('.')
    ]);

    if(!/^[a-zA-Z]+$/.test(value))
        return callback(undefined, msg);

    callback();
};

exports.alphanumeric = function(value, config, callback){
    var msg = typeof config[0] === 'string' ? config[0] : util.format.apply(null, [
        '%s field must contain just alphanumeric characters.',
        this.key.join('.')
    ]);

    if(!/^[a-z0-9]+$/i.test(value))
        return callback(undefined, msg);

    callback();
};

exports.digit = function(value, config, callback){
    var msg = typeof config[0] === 'string' ? config[0] : util.format.apply(null, [
        '%s field must contain only digits.',
        this.key.join('.')
    ]);

    if(!/^[0-9]+$/.test(value))
        return callback(undefined, msg);

    callback();
};

exports.min = function(value, config, callback){
    var msg = config[1] ? config[1] : util.format.apply(null, [
        '%s field needs to be equal or greater than %s.',
        this.key.join('.'),
        config[0]
    ]);

    if(!value || Number(value) < config[0])
        return callback(undefined, msg);

    callback();
};

exports.max = function(value, config, callback){
    var msg = config[1] ? config[1] : util.format.apply(null, [
        '%s field needs to be equal or less than %s.',
        this.key.join('.'),
        config[0]
    ]);

    if(!value || Number(value) > config[0])
        return callback(undefined, msg);

    callback();
};

exports.between = function(value, config, callback){
    var msg = config[2] ? config[2] : util.format.apply(null, [
        '%s field needs to be between %s and %s.',
        this.key.join('.'),
        config[0],
        config[1]
    ]);

    if(!value || !(Number(value) > config[0] && Number(value) < config[1]))
        return callback(undefined, msg);

    callback();
};

exports.email = function(value, config, callback){
    var msg = typeof config[0] === 'string' ? config[0] : util.format.apply(null, [
        '%s field must be a valid e-mail.',
        this.key.join('.')
    ]);

    if(!/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value))
        return callback(undefined, msg);

    callback();
};

exports.regex = function(value, config, callback){
    var msg = config[1] ? config[1] : util.format.apply(null, [
        '%s field didn\'t matched the regular expression.',
        this.key.join('.')
    ]);

    if(!config[0].test(value))
        return callback(undefined, msg);

    callback();
};

exports.equalTo = function(value, config, callback){
    var path;
    var msg;

    if(typeof config[0] === 'string')
        path = config[0];
    else if(Array.isArray(config[0])){
        msg = config[1];
        path = config[0];
    } else
        path = config;

    msg = msg ? msg : util.format.apply(null, [
        '%s field isn\'t equal to the field %s.',
        this.key.join('.'),
        Array.isArray(path) ? path.join('.') : path
    ]);

    if(value !== this.getValueFromOrigin(path))
        return callback(undefined, msg);

    callback();
};

exports.notEqualTo = function(value, config, callback){
    var path;
    var msg;

    if(typeof config[0] === 'string')
        path = config[0];
    else if(Array.isArray(config[0])){
        msg = config[1];
        path = config[0];
    } else
        path = config;

    msg = msg ? msg : util.format.apply(null, [
        '%s field isn\'t equal to the field %s.',
        this.key.join('.'),
        Array.isArray(path) ? path.join('.') : path
    ]);

    if(value === this.getValueFromOrigin(path))
        return callback(undefined, msg);

    callback();
};

exports.inList = function(value, config, callback){
    var list;
    var msg;

    if(Array.isArray(config[0])){
        msg = config[1];
        list = config[0];
    } else
        list = config;

    msg = msg ? msg : util.format.apply(null, [
        '%s field have an unallowed value.',
        list.join('.')
    ]);

    if(list.indexOf(value) === -1)
        return callback(undefined, msg);

    callback();
};

exports.notInList = function(value, config, callback){
    var list;
    var msg;

    if(Array.isArray(config[0])){
        msg = config[1];
        list = config[0];
    } else
        list = config;

    msg = msg ? msg : util.format.apply(null, [
        '%s field have an unallowed value.',
        list.join('.')
    ]);

    if(list.indexOf(value) !== -1)
        return callback(undefined, config[1]);

    callback();
};

exports.date = function(value, config, callback){
    var msg = config[1] ? config[1] : util.format.apply(null, [
        '%s field isn\'t a valid date.',
        this.key.join('.')
    ]);

    if(!moment(value, config[0], true).isValid())
        return callback(undefined, config[1]);

    callback();
};

exports.optional = function(value, config, callback){
    if(helper.isEmpty(value))
        this.addFlag(this.key, 'removeInvalid');

    callback();
};

exports.each = function(value, config, callback){
    if(!Array.isArray(value))
        return callback();

    var index = 0;
    var that = this;
    var isInvalid = false;
    var values = [];

    async.eachSeries(value, function(value, callback){
        config[0].run(value, function(err, invalid, result){
            if(err)
                return callback(err);

            if(invalid){
                isInvalid = true;
                invalid.forEach(function(inv){
                    that.addInvalid(that.key.slice(0).concat([index], inv[0]), inv[1], inv[2]);
                });
            } else
                values.push(result);

            index++;
            callback();
        });
    }, function(err){
        if(err)
            return callback(err);

        if(!isInvalid)
            that.addFlag(that.key, 'forceValue', values);

        callback();
    });
};

exports.custom = function(value, config, callback){
    config[0].call(this, value, function(err, invalid){
        if(err)
            return callback(err);

        callback(null, invalid);
    });
};
