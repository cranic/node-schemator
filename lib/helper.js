exports.types = {
    'string' : function(value){
        return typeof value === 'string';
    },
    'array' : function(value){
        return Array.isArray(value);
    },
    'object' : function(value){
        var json;

        try {
            json = JSON.stringify(value);
        } catch(e){

        }

        if(!json || json.charAt(0) !== '{' || json.charAt(json.length - 1) !== '}')
            return false;

        return true;
    },
    'number' : function(value){
        return typeof value === 'number';
    },
    'boolean' : function(value){
        return typeof value === 'boolean';
    },
    'any' : function(){
        return true;
    }
};

exports.isEmpty = function(value){
    var empty = false;

    if(typeof value === 'string' && value.trim().length === 0)
        empty = true;
    else if(Array.isArray(value) && value.length === 0)
        empty = true;
    else if(exports.types.object(value) && Object.keys(value).length === 0)
        empty = true;
    else if(value === undefined)
        empty = true;

    return empty;
};
