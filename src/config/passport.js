const LocalStrategy = require('passport-local').Strategy;

const User = require('../app/models/user.js');

module.exports = function(passport){

    passport.serializeUser(function(user, done){
        done(null, user.id)
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user)
        });
    });

    // SIGNUP
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
        },
        function(req, email, password, done){
            User.findOne({'local.email': email}, function(err, user){
                if(err){ return done(err)}
                if(user){ 
                    return done(null, false, req.flash('singupMessage', 'El email ya se encuentra registrado'));
                }
                else{
                    var newUser = new User();
                    newUser.local.nombre = req.body.nombre;
                    newUser.local.lastname = req.body.lastname;
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.save(function(err){
                        if(err){throw err}
                        return done(null, newUser)
                    })
                }
            })
    }));

    // LOGIN
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
        },
        function(req, email, password, done){
            User.findOne({'local.email': email}, function(err, user){
                if(err){ return done(err)}
                if(!user){ 
                    return done(null, false, req.flash('loginMessage', 'El email no se encuentra registrado'));
                }
                if(!user.validPassword(password)){
                    return done(null, false, req.flash('loginMessage', 'Contraseña inválida'))
                }
                return done(null, user)
            })
    }));
}