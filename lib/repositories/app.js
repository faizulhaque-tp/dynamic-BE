'use strict';
const App = require('../models/App');
const mongoose = require('mongoose');

module.exports = {
  findAll,
  create
};

function findAll() {
  return App.find();
}

function create(userData){
  return App.save(userData);
}