'use strict';
const errorHandler = require('../../lib/errors');
const App = require('../../lib/models/App');

module.exports = {
  verifyApp
};

function verifyApp(req, res, next) {
  req.checkParams('appId', 'Invalid AppId').isNumeric().len(15,15);
  var errors = req.validationErrors();
  if (errors) {
    return next(new errorHandler.badRequest(errors));

  }
  let appId = req.params.appId;
  App.findOne({_id: appId, userId: req.body.userId}, '_id', function (err, result) {
    if (result===null) {
      return next(new errorHandler.badRequest('Provided AppId does not belong to to you.'));
    } else {
      return next();
    }
  });
}
