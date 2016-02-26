'use strict';
const Uranus = require('uranus');
const rules = require('./rules.js');

const validator = new Uranus();

module.exports = {
  validatePayload,
  rules
};


function validatePayload(payload) {
  return new Promise(function(resolve, reject){
    let result = validator.validateAll(payload);
    if (!result.isValid()) {
      console.log("888888888888888888888888888888888888888888888888888888888");
      return reject(result.getAllMessages());
    } else {
      console.log("*********************************************************");
      return resolve();
    }
  });
}