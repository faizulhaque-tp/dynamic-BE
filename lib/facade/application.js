'use strict';
const appRepo = require('../repositories/app');
const validator = require('../validation');
const helper = require('../helpers');
const rand = require("random-key");
let errorHandler = require("../errors");

module.exports = {
  getAppListing,
  createApp,
  updateApp
};

/**function to return app listing*/
function getAppListing(reqData) {
  return appRepo.findAll(reqData.userId)
    .then((response) => {
      return {
        data: response,
        meta: [{length: response.length}]
      };
    })
}

function createApp(reqData) {
  let payload = {
    _id: helper.generateID(),
    name: reqData.name,
    key: rand.generate(10),
    secret: rand.generate(15),
    isActive: 1,
    isDeleted: 0,
    userId: reqData.userId
  };
  return validator.validatePayload([
      {
        value: payload.name,
        rules: validator.rules.appName
      },
      {
        value: payload.key,
        rules: validator.rules.appKey
      },
      {
        value: payload.secret,
        rules: validator.rules.appSecret
      },
      {
        value: payload.userId,
        rules: validator.rules.ID
      }
    ])
    .then(appRepo.create.bind(this, payload))
    .then(function (response) {
      return response;
    });
}

function updateApp(reqData, appId) {
  let payload = {
    _id: appId,
    name: reqData.name,
    isActive: reqData.isActive,
    isDeleted: reqData.isDeleted,
    domains: reqData.domains
  };
  return validator.validatePayload([
      {
        value: payload._id,
        rules: validator.rules.ID
      },
      {
        value: payload.name,
        rules: validator.rules.appName
      },
      {
        value: payload.isActive,
        rules: validator.rules.bool
      },
      {
        value: payload.isDeleted,
        rules: validator.rules.bool
      },
      {
        value: payload.domains,
        rules: validator.rules.appDomain
      }
    ])
    .then(helper.checkBooleanPair.bind(this, payload.isActive, payload.isDeleted))
    .then(appRepo.update.bind(this, payload))
    .then(function (response) {
      return response;
    });
}




