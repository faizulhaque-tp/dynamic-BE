'use strict';
const jwt = require('jsonwebtoken');
const errorHandler = require('../../lib/errors');
const tokenLookUp = require('../../lib/models/TokenLookUp');

module.exports = {
  verifyToken
};

function verifyToken(req, res, next) {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  // verifies secret and checks exp
  jwt.verify(token, config.secret, function (err) {
    if (err) {
      return next(new errorHandler.unAuthenticatedError(err));
    } else {
      tokenLookUp.findOne({accessToken: token}).exec(function (err, result) {
        if (err) {
          return next(new errorHandler.unAuthenticatedError(err));
        } else if (result && result.userId) {
          //add user id to body once the token is validated for that user.
          req.body.userId = result.userId;
          return next();
        } else {
          return next(new errorHandler.unAuthenticatedError(errorHandler.messages.USER_NOT_FOUND));
        }
      });
    }
  });
}
