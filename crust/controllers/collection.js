'use strict';
const collectionService = require('../../lib/facade/collection.js');

module.exports = {
  getCollectionListing,
  createCollection,
  updateCollection,
  deleteCollection
};

/** Controller to resolve app listing request*/
function getCollectionListing(req, res, next) {
  collectionService.getCollectionListing(req.body, req.params.appId)
    .then(function (response) {
      return res.status(200).json({
        data: response,
        meta: [{length: response.length}]
      });
    }).catch(next);
}

function createCollection(req, res, next) {
  collectionService.createCollection(req.body, req.params.appId)
    .then((response) => {
      res.status(201).json(response[0]);
    }).catch(next);
}

function updateCollection(req, res, next) {
  collectionService.updateCollection(req.body, req.params.appId, req.params.collectionId)
    .then((response) => {
      res.status(200).json(response);
    }).catch(next);
}

function deleteCollection(req, res, next) {
  collectionService.deleteCollection(req.body, req.params.appId, req.params.collectionId)
    .then((response) => {
      res.status(200).json({message: "Collection successfully deleted"});
    }).catch(next);
}
