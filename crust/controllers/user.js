'use strict';
const util = require('util');
const userFacade = require('../../lib/facade/user');
const auth = require('../middleware/auth');
const errorHandler = require('../../lib/errors');
const user = require('../../lib/models/User');
const app = require('../../lib/models/App');
const accountLoopUp = require('../../lib/models/AccountLookUp');

module.exports = {
  logout,
  register,
  login
};

function logout(req, res, next) {
  userFacade.logOutUser(req.body.userId, req.body.token || req.query.token || req.headers['x-access-token'])
    .then(function () {
      res.status(200).json({message: "User Logged out successfully"});
    })
    .catch(next);
}

function login(req, res, next) {

  req.checkBody('userName', 'User Name is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();

  let errors = req.validationErrors();
  if (errors) {
    throw new errorHandler.badRequest(errors);
  }

  /**Call user service for authenticating user for login.
   Retrieve token for the authenticated user.*/
  let token = new userFacade.getOrCreateToken();
  token.retrieveToken(req.body.userName, req.body.password)
    .then((resolve) => {
      res.status(resolve.status).json({token: resolve.token});
    })
    .catch(next);
}

function register(req, res, next) {

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
          res.status(200).json({message: "User successfully registered"});
        })
    })
    .catch(next(new errorHandler.badRequest(errors)));
}