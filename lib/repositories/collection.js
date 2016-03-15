'use strict';
const App = require('../models/App');
const Collection = require('../models/Collection');
const errorHandler = require('../errors/index');
let Promise = require('bluebird');


module.exports = {
  getList,
  create,
  update
};

function getList(userId, appId) {
  return App.findOne({
    _id: appId,
    userId: userId
  }).populate('collections');
}


function create(payload, appId, userId) {

  return collectionUniqueInApp(appId, userId, payload.name)
    .then(function() {
      let collection = new Collection(payload);
      return Promise.all([
        collection.save(),
        App.update({
          _id: appId,
          userId: userId
        }, {
          $push: {
            collections: payload._id
          }
        })
      ])
    });
}

function update(collectionId, payload, appId, userId) {

  return collectionUniqueInApp(appId, userId, payload.name)
    .then(function() {
      return Collection.findOneAndUpdate({
        _id: collectionId
      }, {
        $set: payload
      }, {
        new: true
      })
    })
    .catch(function(error) {
      throw error;
    });
}

/*
 * Validates if collection with same name already exists in the given user's app
 */
function collectionUniqueInApp(appId, userId, collectionName) {
  return App.findOne({
      _id: appId,
      userId: userId
    })
    .populate({
      path: 'collections',
      match: {
        name: collectionName
      },
      select: '_id'
    })
    .exec()
    .then(function(doc) {
      if (doc.collections.length !== 0) {
        throw new errorHandler.badRequest(['Collection with the same name already exists.'])
      } else {
        return true;
      }
    });
}
