'use strict';
const applicationService = require('../../lib/facade/application.js');

module.exports = {
  getAppListing,
  createApp,
  updateApp
};

/** Controller to resolve app listing request*/
function getAppListing(req, res, next) {
  applicationService.getAppListing(req.body)
    .then(function (response) {
      return res.status(200).json(response);
    }).catch(next);
}

function createApp(req, res, next) {
  applicationService.createApp(req.body)
    .then((response) => {
      res.status(201).json(response);
    }).catch(next);
}

function updateApp(req, res, next) {
  applicationService.updateApp(req.body, req.params.appId)
  .then((response) => {
    res.status(200).json(response);
  }).catch(next);
}