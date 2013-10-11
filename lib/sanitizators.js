var crypto = require('crypto');

module.exports = {
    pbkdf2 : function(value, config, callback){
        console.log(callback);
        crypto.pbkdf2(value, config[0], config[1], config[2], function(err, buffer){
            callback(err, buffer.toString('hex'));
        });
    },
    remove : function(value, config, callback){
        this.remove();
        callback();
    }
};
