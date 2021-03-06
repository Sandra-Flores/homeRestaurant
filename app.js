var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var db = require('./helpers/database.js');


var index = require('./routes/index');
var signup = require('./routes/signup');
var login = require('./routes/login');
var auth = require('./routes/auth');
var xml = require('./routes/xml');
var restaurant = require('./routes/restaurant');
var logout = require('./routes/logout');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'Cookie Monster',
  resave: true,
  saveUninitialized: false,
  cookie: {maxage: 60000}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res, next){
  if(req.user){
    res.locals.user = req.user;
  }
  next();
});

// routes
app.use('/', index);
app.use('/signup', signup);
app.use('/login', login);
app.use('/auth', auth);
app.use('/xml', xml);
app.use('/restaurant', restaurant);
app.use('/logout', logout);

db.connect(db.MODE_TEST, function(err){
  if(err){
    console.log("Failed to connect to database")
    process.exit(1);
  } else {
    console.log("Connected to database");  
  }
  
  
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

exports.closeServer = function(){
  app.close();
};