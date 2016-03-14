'use strict';
const Uranus = require('uranus');
const rules = require('./rules.js');
const errorHandler = require('../errors/index');
const _ = require('lodash');
const verify = require('validator');
const validator = new Uranus({
  extensions: {
    isDomainArray(items) {
      if(!items) return true;
      let flag = true;
      let arrayOfItems = items.split(',');
      arrayOfItems.forEach(function (item) {
        if (!verify.isUrl(item)) {
          flag = false;
        }
      });
      return flag;
    }

  }
});

module.exports = {
  validatePayload,
  rules
};


function validatePayload(payload) {
  return new Promise(function (resolve) {
    let result = validator.validateAll(payload);
    if (!result.isValid()) {
      throw new errorHandler.badRequest(result.getAllMessages());
    } else {
      return resolve();
    }
  });
}
