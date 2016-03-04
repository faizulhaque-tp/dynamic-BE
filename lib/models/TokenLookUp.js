'use strict';
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
mongoose.Promise = require('bluebird');

const tokenLookUpSchema = new mongoose.Schema({
  _id: Number,
  userId: String,
  accessToken: String
});
tokenLookUpSchema.plugin(timestamps);

module.exports = mongoose.model('tokenLookUp', tokenLookUpSchema);
