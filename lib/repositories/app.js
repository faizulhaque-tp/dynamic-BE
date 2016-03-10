'use strict';
const App = require('../models/App');


module.exports = {
  findAll,
  create,
  findOne,
  update
};

function findAll(userId) {
  return App.find({userId: userId, isActive: 1, isDeleted: 0});
}

function create(appData){
  let app = new App(appData);
  return app.save();
}

function findOne(appId) {
  return App.find({_id: appId})
}

function update(payload) {
  let condition = {_id: payload._id};
  let update = {
    name: payload.name,
    isActive: payload.isActive,
    isDeleted: payload.isDeleted,
    domains: payload.domains
  };
  return App.findByIdAndUpdate(condition, {$set: update}, {new: true}).exec()
}
