'use strict';

const util = require('util');
let ApplicationError = function (errorMessage, constructor) {
  Error.captureStackTrace(this, constructor || this);
  if (errorMessage) {
    this.error_message = errorMessage;
  }
  else {
    this.error_message = util.format("%s: Error message was not specified.", this.name);
  }

  this.status = "500";
};

util.inherits(ApplicationError, Error);
ApplicationError.prototype.name = "Application Error";

let unAuthenticatedError = function (err) {
  this.status = "401";
  this.error_message = err;
};
unAuthenticatedError.prototype.name = "unAuthenticatedError";
util.inherits(unAuthenticatedError, ApplicationError);

let badRequest = function (err) {
  this.status = "400";
  this.error_message = err;
};
badRequest.prototype.name = "BadRequest";
util.inherits(badRequest, ApplicationError);

module.exports = {
  unAuthenticatedError,
  badRequest
};
 