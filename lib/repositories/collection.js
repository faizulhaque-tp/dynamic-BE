'use strict';
const App = require('../models/App');
const Collection = require('../models/Collection');
let Promise = require('bluebird');


module.exports = {
  findAll,
  create,
  update
};

function findAll(userId, appId) {
  return App.findOne({ _id: appId, userId: userId}).populate('collections');
}

function create(payload, appId, userId){
  let collection = new Collection(payload);
  return Promise.all([
    collection.save(),
    App.findOneAndUpdate({ _id: appId, userId: userId }, {$push:{collections: payload._id}})
 ]);
}

function update(payload) {
  let condition = {
    _id: payload._id
  };
  let update = {
    name: payload.name,
    rules: {
      create: payload.rules.create,
      update: payload.rules.update,
      delete: payload.rules.delete
    },
    updatedAt: new Date().getTime()
  };
  return Collection.findOneAndUpdate(condition, {$set: update}, {new: true})
