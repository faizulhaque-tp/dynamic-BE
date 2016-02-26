'use strict';
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.Promise = require('bluebird');

let User = new mongoose.Schema({
  _id: Number,
  name: String
});
User.plugin(uniqueValidator);

module.exports = mongoose.model('users', User);
