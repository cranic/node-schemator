var helper = require(__dirname + '/helper');

exports.removeInvalid = function(value, config, callback){
    var set = [];
    var keyStr = this.key.join('.');

    this.getInvalid().forEach(function(inv){
        if(inv[0].join('.') !== keyStr)
            set.push(inv);
    });

    this.setInvalid(set);

    callback();
};

exports.remove = function(value, config, callback){
    this.removeResultPath(this.key);
    callback();
};

exports.forceValue = function(value, config, callback){
    console.log(arguments);
    this.setResultValue(this.key, config);
    callback();
};
