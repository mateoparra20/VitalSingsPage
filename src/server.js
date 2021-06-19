const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookie = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session')

const server = express();

const { url } = require('./config/database.js');
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

require('./config/passport.js')(passport);

// SETTINGS
server.set('port', process.env.PORT || 3000); // Establecer el puerto
server.set('views',path.join(__dirname, 'views')); // Configuar las vistas de la app
server.set('view engine', 'ejs'); // Configurar el motor de plantillas

//MIDDLEWARES
server.use(morgan('dev'));
server.use(cookie());
server.use(bodyParser.urlencoded({extended: false}));
server.use(session({
    secret: 'tesisdegrado',
    resave: false,
    saveUninitialized: false
}));
server.use(passport.initialize());
server.use(passport.session());
server.use(flash());
server.use(express.static(" public "))

//ROUTES
require('./app/routes.js')(server, passport);

//STATIC FILES
server.use(express.static(path.join(__dirname, 'public')));


server.listen(server.get('port'), () => {
    console.log('server on port', server.get('port'))
}); // Obtener el puerto