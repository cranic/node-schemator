var dotty = require('dotty');
var async = require('async');
var crypto = require('crypto');

var Schemator = function(object){
    var self = this;

    // All sanitizators goes here
    this.sanitizators = {
        pbkdf2 : function(value, config, callback){
            if(!value)
                callback();
            crypto.pbkdf2(value, config[0], config[1], config[2], function(err, buffer){
                callback(err, buffer.toString('hex'));
            });
        },
        remove : function(value, config, callback){
            this.remove();
            callback();
        },
        integer : function(value, config, callback){
            callback(undefined, parseInt(value, 10));
        }
    };

    // All validators goes here
    this.validators = {
        required : function(value, config, callback){
            callback(undefined, value !== undefined ? undefined : config);
        },
        minLength : function(value, config, callback){
            if(!value || !value.toString || value.toString().length < config[0])
                return callback(undefined, config[1]);
            callback();
        },
        maxLength : function(value, config, callback){
            if(!value || !value.toString || value.toString().length > config[0])
                return callback(undefined, config[1]);
            callback();
        },
        email : function(value, config, callback){
            if(!/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value))
                return callback(undefined, config);

            callback();
        },
        regex : function(value, config, callback){
            if(!config[0].test(value))
                return callback(undefined, config[1]);
            callback();
        },
        equalTo : function(value, config, callback){
            if(value !== this.readObject(config[0]))
                return callback(undefined, config[1]);
            callback();
        },
        alphanumeric : function(value, config, callback){
            if(!/^[a-z0-9]+$/i.test(value))
                return callback(undefined, config);
            callback();
        },
        alpha : function(value, config, callback){
            if(!/^[a-zA-Z]+$/.test(value))
                return callback(undefined, config);
            callback();
        },
        numeric : function(value, config, callback){
            if(!/^[0-9]+$/.test(value))
                return callback(undefined, config);
            callback();
        },
        inList : function(value, config, callback){
            if(config[0].indexOf(value) === -1)
                return callback(undefined, config[1]);
            callback();
        },
        notInList : function(value, config, callback){
            if(config[0].indexOf(value) !== -1)
                return callback(undefined, config[1]);
            callback();
        },
        optional : function(value, config, callback){
            if(!value){
                this.clearErrors();
                this.remove();
            }
            callback(undefined, undefined, true);
        }
    };


    // Here we will store all rules to use later
    this.rules = {
        sanitize : [],
        validate : []
    };

    // Store the configuration
    this.object = object;

    // Generate the rules
    dotty.deepKeys(object).forEach(function(el){
        var method = el[el.length - 1];
        if(method === 'sanitize' || method === 'validate')
            Object.keys(dotty.get(object, el)).forEach(function(key){
                var newOne = el.slice(0, el.length - 1);
                newOne.push(key);
                self.rules[method].push(newOne);
            });
    });
};

Schemator.prototype.run = function(object, callback){
    var self = this;
    var invalid = [];
    var result = {};
    var current = null;
    var context = {
        invalid : function(message, path){
            if(current)
                invalid.push([current.join('.'), message]);
        },
        clearErrors : function(path){
            var cleared = [];
            var from = path ? path : current;
            invalid.forEach(function(el){
                if(el[0] !== from.join('.'))
                    cleared.push(el);
            });

            invalid = cleared;
        },
        write : function(value, path){
            var to = path ? path : current;
            dotty.put(result, to, value);
        },
        remove : function(path){
            var to = path ? path : current;
            dotty.remove(result, to);
        },
        read : function(path){
            var from = path ? path : current;
            return dotty.get(result, from);
        },
        readObject : function(path){
            var from = path ? path : current;
            return dotty.get(object, from);
        }
    };

    async.series([
        function(callback){
            async.eachSeries(self.rules.validate, function(inspect, callback){
                var rule = inspect.slice(0);
                var func = rule[rule.length - 1];
                current = rule.slice(0, rule.length - 1);
                if(!self.validators[func])
                    return callback(new Error('Unknown validator ' + func));

                rule.splice(rule.length - 1, 0, 'validate');
                self.validators[func].apply(context, [dotty.get(object, current), dotty.get(self.object, rule), function(err, invalid, skip){
                    if(invalid)
                        context.invalid(invalid);
                    else
                        if(!skip)
                            context.write(dotty.get(object, current));

                    callback(err);
                }]);
            }, function(err){
                callback(err);
            });
        },
        function(callback){
            if(invalid.length)
                return callback();

            async.eachSeries(self.rules.sanitize, function(inspect, callback){
                var rule = inspect.slice(0);
                var func = rule[rule.length - 1];
                current = rule.slice(0, rule.length - 1);
                if(!self.sanitizators[func])
                    return callback(new Error('Unknown sanitizator ' + func));

                rule.splice(rule.length - 1, 0, 'sanitize');
                self.sanitizators[func].apply(context, [dotty.get(object, current), dotty.get(self.object, rule), function(err, result){
                    if(result)
                        context.write(result);

                    callback(err);
                }]);
            }, function(err){
                callback(err);
            });
        }
    ], function(err){
        if(err)
            callback(err);
        else if(invalid.length)
            callback(undefined, invalid);
        else
            callback(undefined, undefined, result);
    });
};


module.exports = Schemator;
