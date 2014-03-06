module.exports = function(method, value, args, input, callback){
    if(typeof input === 'function')
        callback = input;

    var object = (typeof input === 'object') ? input : {};
    var result = {};
    var flags = [];
    var invalid = [];
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
        },
        key : ['testing']
    };

    method.call(context, value, args, function(err, msg){
        if(msg)
            invalid.push([context.key, 'mock', msg]);

        callback(err, {
            invalid : invalid,
            result : result,
            object : object,
            flags : flags
        });
    });

};
