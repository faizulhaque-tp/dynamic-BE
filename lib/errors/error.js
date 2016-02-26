'use strict';
const util = require('util');
let BaseModel = function BaseModel(){};
BaseModel.prototype.customErrorHandler = function (errorMsg, errorStatus) { console.log(errorStatus +' '+ errorMsg) };

//module.exports = {
//  UserModel
//};

function UserModel(errorMsg, errorStatus) {
  BaseModel.apply(this, arguments);
  this.customErrorHandler(errorMsg, errorStatus);
}
util.inherits(UserModel, BaseModel);

let user = new UserModel("my error", 400);

