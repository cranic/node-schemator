var util = require('util');
var Schemator = require('../');
var schema = new Schemator({
    books : {
        type : 'array',
        notEmpty : 'Você deve ter livros.',
        each : new Schemator({
            name : {
                type : 'string',
                sanitize : {
                    upperCase : true
                }
            }
        })
    }
});

schema.run({
    books : [0]
}, function(err, invalid, result){
    if(err)
        throw err;

    if(invalid)
        invalid.forEach(function(inv){
            console.log(util.format('Chave %s invalidada por %s com a mensagem "%s"', inv[0].join('.'), inv[1], inv[2]));
        });

    if(result)
        console.log('Success!', result);

    console.log('Terminado');
});
