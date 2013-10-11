var dotty = require('dotty');
var async = require('async');

var Schemator = function(){
    this.object = null;
    this.rules = {
        sanitize : [],
        validate : []
    };
    this.validators = require('./validators');
    this.sanitizators = require('./sanitizators');
};

Schemator.prototype.schema = function(object){
    var self = this;

    this.object = object;

    dotty.deepKeys(object).forEach(function(el){
        var method = el[el.length - 1];
        if(method === 'sanitize' || method === 'validate')
            Object.keys(dotty.get(object, el)).forEach(function(key){
                var newOne = el.slice(0, el.length - 1);
                newOne.push(key);
                self.rules[method].push(newOne);
            });
    });

    return this;
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
            var from = path ? path : current;
            invalid.forEach(function(el, index){
                if(el[0] === from.join('.'))
                    invalid.splice(index, 1);
            });
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
            async.eachSeries(self.rules.validate, function(rule, callback){
                var func = rule[rule.length - 1];
                current = rule.slice(0, rule.length - 1);
                if(!self.validators[func])
                    return callback(new Error('Unknown validator ' + func));

                rule.splice(rule.length - 1, 0, 'validate');
                self.validators[func].apply(context, [dotty.get(object, current), dotty.get(self.object, rule), function(err, invalid){
                    if(invalid)
                        context.invalid(invalid);
                    else
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

            async.eachSeries(self.rules.sanitize, function(rule, callback){
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


module.exports = new Schemator();
