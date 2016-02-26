'use strict';
const appRepo = require('../repositories/app');
const validator = require('../validation');

module.exports = {
  getAppListing,
  createApp
};

//function to return app listing
function getAppListing() {
  return Promise.resolve(appRepo.findAll())
    .then((response) => {
      return {
        data: response,
        meta: [{length: response.length}]
      };
    })
}

function createApp(reqData) {
  let payload = [
    {
      value: reqData.name,
      rules: validator.rules.appName
    }
  ];
  return validator.validatePayload(payload)
    .then(function (resolved) {
      console.log("Promise is resolved");
      return Promise.resolve("The Promise is resolved");
    })
    .catch(function (err) {
      console.log("Promise is rejected");
      //throw custom handler
      throw  err;
    });
}




