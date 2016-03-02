'use strict';
var util = require('util');
var userFacade = require('../../lib/facade/UserFacade');
var auth = require('../middleware/auth');
const errorHandler = require('../../lib/errors/index');

module.exports = {
  logout,
  register,
  login
};

function logout(req, res, next) {
  req.checkBody('userId', 'UserID cannot be empty.').notEmpty();
  req.checkBody('userId', 'UserID type is invalid').isInt();
  var errors = req.validationErrors();
  if (errors) {
    throw new errorHandler.badRequest(errors);
  }
  userFacade.logOutUser(req.body.userId, req.body.token || req.query.token || req.headers['x-access-token'])
    .then(function () {
      res.status(200).send('User Logged out successuflly');
    })
    .catch(function (err) {
      next(err);
    });
}

function login(req, res, next) {

  req.checkBody('userName', 'User Name is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    throw new errorHandler.badRequest(errors);
  }
  userFacade.createToken(req.body.userName, req.body.password)
    .then(function (value) {
      if (value.token) {
        value.message = 'Token Created successuflly';
        res.status(201).send(value);
      }
    })
    .catch(function (err) {
      next(err)
    });
}

function register(req, res) {

  var user = require('../../lib/models/User');
  var app = require('../../lib/models/App');
  var accountLoopUp = require('../../lib/models/AccountLookUp');

  req.checkBody('devloperName', 'Developer Name  is required').notEmpty();
  req.checkBody('userName', 'User Name is required').notEmpty();
  req.checkBody('appName', 'App Name is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.check('devloperName', 'devloperName Taken').isFieldAvailable(user, 'name');
  req.check('userName', 'Username Taken').isFieldAvailable(accountLoopUp, 'accountId');
  req.check('appName', 'Username Taken').isFieldAvailable(app, 'name');
  req.asyncValidationErrors()
    .then(function () {
      userFacade.saveUser(req.body.devloperName, req.body.userName, req.body.password, req.body.appName)
        .then(function () {
          res.status(200).end('User saved');
        })
        .catch(function (error) {
          throw new errorHandler.badRequest(errors);
        });
    })
    .catch(function (errors) {
      console.log('async');
      throw new errorHandler.badRequest(errors);
    });

}