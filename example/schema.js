var schema = require('../');
schema.schema({
    name : {
        validate : {
            required : 'Você precisa digitar o seu nome.',
            minLength : [2, 'O seu nome deve ter no mínimo duas letras.'],
            maxLength : [40, 'O seu nome não pode ter mais de 20 caracteres.' ]
        }
    },
    surname : {
        validate : {
            required : 'Você precisa digitar o seu sobrenome.',
            minLength : [2, 'O seu sobrenome deve ter no mínimo duas letras.'],
            maxLength : [40, 'O seu sobrenome não pode ter mais de 20 caracteres.' ]
        }
    },
    email : {
        validate : {
            required : 'Você precisa digitar um e-mail.',
            email : 'Você precisa digitar um e-mail válido.',
            maxLength : [60, 'O seu e-mail deve ter no máximo 60 caracteres.']
        }
    },
    password : {
        validate : {
            required : 'Você precisa digitar a sua senha.',
            regex : [/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, 'A sua senha deve conter ao menos um número, uma letra maiúscula e uma minúscula.'],
            minLength : [6, 'Sua senha deve ter no mínimo 6 caracteres.'],
            maxLength : [30, 'Sua senha deve ter no máximo 30 caracteres.']
        },
        sanitize : {
            pbkdf2 : ['salt', 10000, 64]
        }
    },
    password_check : {
        validate : {
            required : 'Você precisa digitar sua senha novamente.',
            equalTo : ['password', 'As senhas digitadas são diferentes.']
        },
        sanitize : {
            remove : true
        }
    }
});

schema.run({
    'name' : 'Alan',
    'surname' : 'Hoffmeister',
    'email' : 'alanhoffmeister@gmail.com',
    'password' : 'minhAs3nha',
    'password_check' : 'minhAs3nha'
}, function(err, invalid, result){
    console.log('Erro:', err);
    console.log('Invalido:', invalid);
    console.log('Resultado:', result);
});
