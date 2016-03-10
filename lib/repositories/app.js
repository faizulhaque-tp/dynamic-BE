'use strict';
const App = require('../models/App');


module.exports = {
  findAll,
  create
};

function findAll(userId) {
  return App.find({userId: userId});
}

function create(appData){
  let app = new App(appData);
  return app.save();
} 
