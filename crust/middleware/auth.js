'use strict';
var jwt = require('jsonwebtoken');
var AppErrors = require('../../lib/errors/index');
var tokenLookUp = require('../../lib/models/TokenLookUp');

module.exports = {
  verifyToken
};

function verifyToken(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // verifies secret and checks exp
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      next(new AppErrors.unAuthenticatedError(err));
    } else {
      tokenLookUp.findOne({accessToken: token}).exec(function (err, result) {
        if (err) {
          next(new AppErrors.unAuthenticatedError(err));
        }
        if (result && result.userId){
          //add user id to body once the token is validated for that user.
          req.body.userId = result.userId;
        }
        next();
      });
    }
  });
}

