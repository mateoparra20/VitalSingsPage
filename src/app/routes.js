//const passport = require("passport");

module.exports = (server, passport) => {

    server.get('/', (req, res) => {
        res.render('index')
    });
    server.get('/login', (req, res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        })
    });
    server.get('/signup', (req, res) => {
        res.render('signup', {
            message: req.flash('singupMessage')
        })
    });
    server.get('/profile', isLoggedIn, (req, res) => {
        res.render('profile', {
            user: req.user
        })
    });
    server.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/')
    });
    server.get('/inicio', (req, res) => {
        res.render('inicio', {
            user: req.user
        })
    });
    server.get('/signos', (req, res) => {
        res.render('signos', {
            user: req.user
        })
    });





    server.post('/login', passport.authenticate('local-login', {
        successRedirect: '/inicio',
		failureRedirect: '/login',
		failureFlash: true // allow flash messages
    }));

    server.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/inicio',
		failureRedirect: '/signup',
		failureFlash: true // allow flash messages
    }));



    function isLoggedIn(req, res, next){

        if(req.isAuthenticated()){
            return next();
        }

        return res.redirect('/')

    }

};