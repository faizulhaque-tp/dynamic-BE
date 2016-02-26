'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

let Schema = mongoose.Schema;
let Rules = new Schema({
  add: String,
  update: String,
  delete: String
});

let Collection = new Schema({
  name: String,
  rules: [Rules],
  createdAt: Number,
  updatedAt: Number
});

module.exports = mongoose.model('collections', Collection);