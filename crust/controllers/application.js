'use strict';
const applicationService = require('../../lib/facade/application.js');

module.exports = {
  getAppListing,
  createApp,
  updateApp,
  activateDeactivateApp,
  deleteApp
};

/** Controller to resolve app listing request*/
function getAppListing(req, res, next) {
  applicationService.getAppListing(req.body)
    .then(function (response) {
      return res.status(200).json({
        data: response,
        meta: {length: response.length}
      });
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

function activateDeactivateApp(req, res, next) {
  applicationService.activateDeactivateApp(req.body, req.params.appId)
    .then((response) => {
      res.status(200).json({message: "App status successfully changed"});
    }).catch(next);
}

function deleteApp(req, res, next) {
  applicationService.deleteApp(req.body, req.params.appId)
    .then((response) => {
      res.status(200).json({message: "App successfully deleted"});
    }).catch(next);
}
