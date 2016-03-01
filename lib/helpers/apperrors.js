
var util = require('util');
var ApplicationError = function (errorMessage, constructor) {
   Error.captureStackTrace(this, constructor || this);
   if (errorMessage) {
       this.error_message = errorMessage;
   }
   else {
       this.error_message =  util.format("%s: Error message was not specified.", this.name);
   }

   this.httpCode = "500";
};

 util.inherits(ApplicationError, Error);
ApplicationError.prototype.name = "Application Error";

var unAuthenticatedError = function (err) {
	
   this.httpCode = "401";
   this.error_message = err;
};
unAuthenticatedError.prototype.name = "unAuthenticatedError";
 util.inherits(unAuthenticatedError, ApplicationError);

 module.exports.unAuthenticatedError =unAuthenticatedError;
 module.exports.ApplicationError =ApplicationError;
 