module.exports = {
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
    }
};