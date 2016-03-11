'use strict';
const validator = require('../validation');
const helper = require('../helpers');
const Collection = require('../models/Collection');
const collectionRepo = require('../repositories/collection');
let errorHandler = require("../errors");

module.exports = {
  getCollectionListing,
  createCollection,
  updateCollection,
  deleteCollection
};

function getCollectionListing(reqData, appId) {
  return collectionRepo.findAll(reqData.userId, appId);
}

function createCollection(reqData, appId) {
  let payload = {
    _id: helper.generateID(),
    name: reqData.name,
    rules: {
      create: reqData.rules.create,
      update: reqData.rules.update,
      delete: reqData.rules.delete
    },
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime()
  };
  return validator.validatePayload([
      {
        value: payload.name,
        rules: validator.rules.appName
      }
      // No validation for rules as per requirement
    ])
    .then(collectionRepo.create.bind(this, payload, appId, reqData.userId))
    .then(function(response){
      return response;
    });
}

function updateCollection(reqData, appId, collectionId) {
  let payload = {
    _id: collectionId,
    name: reqData.name,
    rules: {
      create: reqData.rules.create,
      update: reqData.rules.update,
      delete: reqData.rules.delete
    },
    updatedAt: new Date().getTime()
  };
  return validator.validatePayload([
    {
      value: payload.name,
      rules: validator.rules.appName
      // No validation for rules as per requirement
    }
    ])
    .then(collectionRepo.update.bind(this, payload))
    .then(function (response) {
      return response;
    });
}


function deleteCollection(reqData, appId, collectionId) {
  let payload = {
    _id: collectionId
  };
  return validator.validatePayload([
      {
        value: payload._id,
        rules: validator.rules.ID
      }
    ])
    .then(function () {
      return Collection.findOneAndUpdate({ _id: payload._id }, {$set:{isDeleted: true}})
    });
}
