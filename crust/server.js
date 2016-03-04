'use strict';
global.config = require('./config');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const validationHelper = require('./../lib/helpers/express_validation');
const mongoose = require('mongoose');
mongoose.connect(config.dbUrl);

const jwt = require('jsonwebtoken');
const application = require('./routes/application');
const user = require('./routes/user');
//var apiRoutes = require('./routes/api');
var app = express();

// seting secret for using in api 
app.set('apisecret', config.secret);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(validationHelper);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes are declared here
app.use('/api', [user, application]);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({
      message: err.error_message
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
