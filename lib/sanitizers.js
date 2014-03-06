var helper = require(__dirname + '/helper');
var str = require('underscore.string');
var moment = require('moment');
var crypto = require('crypto');

exports.default = function(value, options, callback){
    callback(null, helper.isEmpty(value) ? options : value);
};

exports.toString = function(value, options, callback){
    callback(null, String(value));
};

exports.toNumber = function(value, options, callback){
    callback(null, Number(value));
};

exports.toString = function(value, options, callback){
    callback(null, Boolean(value));
};

exports.upperCase = function(value, options, callback){
    callback(null, String(value).toUpperCase());
};

exports.lowerCase = function(value, options, callback){
    callback(null, String(value).toLowerCase());
};

exports.capitalize = function(value, options, callback){
    callback(null, str.capitalize(String(value)));
};

exports.clean = function(value, options, callback){
    callback(null, str.clean(String(value)));
};

exports.escapeHTML = function(value, options, callback){
    callback(null, str.escapeHTML(String(value)));
};

exports.unescapeHTML = function(value, options, callback){
    callback(null, str.unescapeHTML(String(value)));
};

exports.titleize = function(value, options, callback){
    callback(null, str.titleize(String(value)));
};

exports.camelize = function(value, options, callback){
    callback(null, str.camelize(String(value)));
};

exports.classify = function(value, options, callback){
    callback(null, str.classify(String(value)));
};

exports.underscored = function(value, options, callback){
    callback(null, str.underscored(String(value)));
};

exports.dasherize = function(value, options, callback){
    callback(null, str.dasherize(String(value)));
};

exports.humanize = function(value, options, callback){
    callback(null, str.humanize(String(value)));
};

exports.trim = function(value, options, callback){
    callback(null, str.trim(String(value), typeof options[0] === 'string' ? options[0] : undefined));
};

exports.ltrim = function(value, options, callback){
    callback(null, str.ltrim(String(value), typeof options[0] === 'string' ? options[0] : undefined));
};

exports.rtrim = function(value, options, callback){
    callback(null, str.rtrim(String(value), typeof options[0] === 'string' ? options[0] : undefined));
};

exports.truncate = function(value, options, callback){
    callback(null, str.truncate(String(value), options[0], typeof options[1] === 'string' ? options[1] : undefined));
};

exports.prune = function(value, options, callback){
    callback(null, str.prune(String(value), options[0], typeof options[1] === 'string' ? options[1] : undefined));
};

exports.dateTransform = function(value, options, callback){
    var date = moment(value, options[0], true).format(options[1]);

    callback(null, date);
};

exports.dateTransform = function(value, options, callback){
    var date = moment(value, options[0], true).format(options[1]);

    callback(null, date);
};

exports.hash = function(value, options, callback){
    var hash = crypto.createHash(options[0]);
    hash.update(String(value) + (options[1] ? options[1] : ''));

    callback(null, hash.digest('hex'));
};

exports.remove = function(value, options, callback){
    this.addFlag(this.key, 'remove');
    callback();
};

exports.pbkdf2 = function(value, options, callback){
    crypto.pbkdf2(value, options[0], options[1], options[2], function(err, hash){
        if(err)
            return callback(err);

        callback(null, hash.toString('hex'));
    });
};

exports.custom = function(value, options, callback){
    options[0].call(this, value, callback);
};

