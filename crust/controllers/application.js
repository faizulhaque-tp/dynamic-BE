'use strict';
const applicationService = require('../../lib/facade/application.js');

module.exports = {
  getAppListing,
  createApp
};

//controller to resolve app listing request
function getAppListing(req, res, next) {
  applicationService.getAppListing()
    .then(function (response) {
      return res.send(response);
    }).catch(next);
}

function createApp(req, res, next) {
  applicationService.createApp(req.body)
    .then((response) => {
      console.log("Controller call accepted");
      res.json(response);
    }).catch(next);
}