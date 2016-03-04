'use strict';

const commonHelper = require('../helpers/commonHelper');
const jwt = require('jsonwebtoken');
const errorHandler = require('../errors/index');
const tokenLookUp = require('../models/TokenLookUp');
const userAccount = require('../models/AccountLookUp');
const helper = require('../helpers/commonHelper');
const user = require('../models/User');
const app = require('../models/App');
const rand = require("random-key");
const tokenLookUpRepo = require("../repositories/tokenLookUp");
let Promise = require('bluebird');


function logOutUser(userId, token) {
  /** Find user with provided userID and token in DB.
   * Remove the token of such user. */
  return tokenLookUp.findOneAndRemove({userId: userId, accessToken: token})
    .then(function (object) {
      if (!object) {
        throw new errorHandler.unAuthenticatedError('User not found');
      }
    });
}

let getOrCreateToken = function () {
};

/**Function to retrieve token from DB.
 If token is not available for authenticated user, it will be created.*/
getOrCreateToken.prototype.retrieveToken = Promise.coroutine(function* (username, password) {

  /**Authenticate user trying to login.*/
  let authenticatedUser = yield userAccount.Authenticate(username, password);
  if (!authenticatedUser) throw new errorHandler.unAuthenticatedError('User not registered.');

  /**If authenticated and token exists in DB, return the token.*/
  let retrieveTokenFromDb = yield tokenLookUpRepo.find(authenticatedUser);
  if (retrieveTokenFromDb) return {status: 200, token: retrieveTokenFromDb.accessToken};
  else {
    /**Else generate new token save in DB and finally return response.*/
    let newToken = jwt.sign(authenticatedUser.userId, config.secret);
    return yield tokenLookUpRepo.create(newToken, authenticatedUser.userId)
      .then((response) => {
        return {status: 201, token: response.accessToken};
      });
  }
});

function saveUser(devloperName, userName, password, appName) {

  let user = new user({
    _id: commonHelper.generateID(),
    'name': devloperName
  });
  return user.save()
    .then(function (value) {
      console.log('inside save user' + value);
      let userAccount = new userAccount({
        _id: userName,
        userId: value._id,
        password: password,
        isActive: 1,
        isDeleted: 0,
        createdAt: new Date().getTime()
      });
      let appObj = new app({
        _id: commonHelper.generateID(),
        name: appName,
        key: rand.generate(10),
        secret: rand.generate(15),
        isActive: 1,
        isDeleted: 0,
        userId: user._id,
        createdAt: new Date().getTime()
      });
      return Promise.all([userAccount.save(), appObj.save()]);
    });

}

module.exports = {
  logOutUser,
  saveUser,
  getOrCreateToken
};