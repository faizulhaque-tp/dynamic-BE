global.config = require('./config');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var validationHelper = require('./../lib/helpers/express_validation');
var AppErrors    = require('../lib/helpers/apperrors');



var mongoose = require('mongoose');
mongoose.connect(config.dbUrl);

var jwt    = require('jsonwebtoken');



var application = require('./routes/application');
var routes = require('./routes/index');
var users = require('./routes/users');
var apiRoutes = require('./routes/api');
var app = express();

// seting secret for using in api 
app.set('apisecret',config.secret);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(expressValidator());
app.use(validationHelper);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes are declared here
app.use('/', [routes,application]);
app.use('/api', apiRoutes);
//app.use('/test', apiRoutes);




//app.use('/users', users);
//app.get('users/register', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.error_message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
