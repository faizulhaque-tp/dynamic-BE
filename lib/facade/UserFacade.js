'use strict';
const commonHelper = require('../helpers/commonHelper');
const jwt = require('jsonwebtoken');
const errorHandler = require('../errors/index');
const tokenLookUp = require('../models/TokenLookUp');
const userAccount = require('../models/AccountLookUp');
const helper = require('../helpers/commonHelper');

module.exports = {
  logOutUser,
  createToken,
  saveUser
};

function logOutUser(userId, token) {
  return tokenLookUp.findOneAndRemove({userId: userId, accessToken: token})
    .then(function (object) {
      if (!object) {
        throw new errorHandler.unAuthenticatedError('User not found');
      }
    });
}

function createToken(username, password, next) {

  return userAccount.Authenticate(username, password)
    .then(function (value) {
      if (value && value.userId) {

        //check if token already exists. If so return that token.
        //todo: move this query to tokenLookUp repository.
        tokenLookUp.findOne({userId: value.userId}).select({"accessToken": 1, "_id": 0})
          .exec(function (err, token) {
            if (err) throw new errorHandler.unAuthenticatedError(err);
            if (token) {
              return {'token': token};
            }
          });

        let token = jwt.sign(value.userId, config.secret);
        //todo: move this query to tokenLookUp repository.
        let tokenLookUpNew = new tokenLookUp({_id: helper.generateID(), userId: value.userId, accessToken: token});
        return tokenLookUpNew.save()
          .then(function () {
            return {'token': token};
          })
          .catch(function (errors) {
              throw new errorHandler.unAuthenticatedError('unable to created token');
            }
          )
      } else {
        throw new errorHandler.unAuthenticatedError('User Not Found');
      }
    })
    .catch(function (errors) {
      throw errors;
    });
}

function saveUser(devloperName, userName, password, appName) {

  var userM = require('../models/User');
  var accountLoopUpM = require('../models/AccountLookUp');
  var appM = require('../models/App');
  var rand = require("random-key");
  var user = new userM({
    _id: commonHelper.generateID(),
    'name': devloperName
  });
  return user.save()
    .then(function (value) {
      console.log('inside save user' + value);
      var userAccount = new accountLoopUpM({
        _id: userName,
        userId: value._id,
        password: password,
        isActive: 1,
        isDeleted: 0,
        createdAt: new Date().getTime()
      });
      var appObj = new appM({
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


