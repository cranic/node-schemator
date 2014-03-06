var dotty = require('dotty');
var validations = require(__dirname + '/validations');
var sanitizers = require(__dirname + '/sanitizers');
var flaggers = require(__dirname + '/flaggers');
var async = require('async');
var helper = require(__dirname + '/helper');

/**
 * Main Schemator class
 *
 * @class Schemator
 * @public
 */
var Schemator = function(schema, options){
    if(!(this instanceof Schemator))
        return new Schemator(schema, options);

    var that = this;

    // We will keep all rules inside here
    this.rules = {
        validation : [],
        sanitize : []
    };

    this.keys = [];

    this.custom = {
        validation : {},
        sanitizer : {},
        flagger : {}
    };

    dotty.deepKeys(schema).forEach(function(key){
        var value = dotty.get(schema, key);
        var type = key.slice(key.length - 1)[0];
        var cleanKey = key.slice(0, key.length -1);

        if(type === 'type' && (typeof value === 'string' || Array.isArray(value))){
            Object.keys(dotty.get(schema, cleanKey)).forEach(function(ruleKey){
                var params = dotty.get(schema, cleanKey.concat([ruleKey]));
                if(ruleKey === 'sanitize')
                    Object.keys(dotty.get(schema, cleanKey.concat([ruleKey]))).forEach(function(sanKey){
                        that.rules.sanitize.push([cleanKey, sanKey, params[sanKey]]);
                    });
                else
                    that.rules.validation.push([cleanKey, ruleKey, params]);
            });
        }
    });
};

Schemator.prototype.run = function(obj, callback){
    var that = this;
    var result = {};
    var invalid = [];
    var validationRules = this.rules.validation.slice(0);
    var sanitizationRules = this.rules.sanitize.slice(0);
    var flags = [];
    var sntzValuesStore = {};
    var context = {
        addFlag : function(key, flag, args){
            flags.push([key, flag, args]);
        },
        addInvalid : function(key, validator, message){
            invalid.push([key, validator, message]);
        },
        getResult : function(){
            return result;
        },
        getFlags : function(){
            return flags;
        },
        setInvalid : function(arr){
            invalid = arr.slice(0);
        },
        getInvalid : function(){
            return invalid;
        },
        getValueFromOrigin : function(key){
            return dotty.get(obj, key);
        },
        getValueFromResult : function(key){
            return dotty.get(result, key);
        },
        setResultValue : function(key, value){
            dotty.put(result, key, value);
        },
        removeResultPath : function(key){
            dotty.remove(result, key);
        }
    };

    async.series([

        // Starting validation
        function(callback){
            async.each(validationRules, function(val, callback){
                setImmediate(function(){
                    var validation = val.slice(0);

                    var func = validations[validation[1]] || that.custom.validation[validation[1]];
                    var value = dotty.get(obj, validation[0]);
                    var args = Array.isArray(validation[2]) ? validation[2] : [validation[2]];

                    context.key = validation[0];

                    if(!func)
                        return callback(new Error('Unknown validation method ' + validation[1]));

                    func.call(context, value, args, function(err, inv, override){
                        if(err)
                            return callback(err);

                        if(inv)
                            invalid.push([validation[0], validation[1], inv]);
                        else
                            dotty.put(result, validation[0], override ? override : value);

                        callback();
                    });
                });
            }, function(err){
                callback(err);
            });
        },

        // Starting flag system
        function(callback){
            async.eachSeries(flags, function(f, callback){
                setImmediate(function(){
                    var flag = f.slice(0);
                    var value = dotty.get(obj, flag[0]);
                    var flagger = flaggers[flag[1]] || that.custom.flagger[flag[1]];
                    var args = Array.isArray(flag[2]) ? flag[2] : [flag[2]];

                    context.key = flag[0];

                    if(!flagger)
                        return callback(new Error('Unknown flagger method ' + flag[1]));

                    flagger.call(context, value, args, function(err){
                        callback(err);
                    });
                });
            }, function(err){
                callback(err);
            });
        },

        // Starting sanitization system
        function(callback){
            if(invalid.length > 0)
                return callback();

            flags = [];

            async.eachSeries(sanitizationRules, function(s, callback){
                setImmediate(function(){
                    var sntz = s.slice(0);
                    var value = sntzValuesStore[sntz[0].join('.')] ? sntzValuesStore[sntz[0].join('.')] : dotty.get(obj, sntz[0]);
                    var sanitizer = sanitizers[sntz[1]] || that.custom.sanitizer[sntz[1]];
                    var args = Array.isArray(sntz[2]) ? sntz[2] : [sntz[2]];

                    context.key = sntz[0];

                    if(!sanitizer)
                        return callback(new Error('Unknown sanitization method ' + sntz[1]));

                    sanitizer.call(context, value, args, function(err, value){
                        if(err)
                            return callback(err);

                        if(value !== undefined){
                            dotty.put(result, sntz[0], value);
                            sntzValuesStore[sntz[0].join('.')] = value;
                        }

                        callback();
                    });
                });
            }, function(err){
                callback(err);
            });

        },

        // Starting second flag system
        function(callback){
            async.eachSeries(flags, function(f, callback){
                setImmediate(function(){
                    var flag = f.slice(0);
                    var value = dotty.get(obj, flag[0]);
                    var flagger = flaggers[flag[1]] || that.custom.flagger[flag[1]];
                    var args = Array.isArray(flag[2]) ? flag[2] : [flag[2]];

                    context.key = flag[0];

                    if(!flagger)
                        return callback(new Error('Unknown flagger method ' + flag[1]));

                    flagger.call(context, value, args, function(err){
                        callback(err);
                    });
                });
            }, function(err){
                callback(err);
            });
        }
    ], function(err){
        if(err)
            return callback(err);

        if(invalid.length > 0)
            return callback(null, invalid);

        callback(null, null, result);
    });

};

module.exports = Schemator;
