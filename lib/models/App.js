'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

let Schema = mongoose.Schema;
let apiSchema = new Schema({
  _id: Number,
  name: {type: String, required: true, unique: true},
  key: {type: String, required: true},
  secret: {type: String, required: true},
  domains: Array,
  isActive: Boolean,
  isDeleted: Boolean,
  userId: Number,
  collections: [{
    type: Number,
    ref: 'collections'
  }],
  createdAt: Number,
  updatedAt: Number,
  createdBy: Number,
  updatedBy: Number

});

module.exports = mongoose.model('apps', apiSchema);
