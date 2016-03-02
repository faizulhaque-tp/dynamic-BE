'use strict';
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
mongoose.Promise = require('bluebird');

let Schema = mongoose.Schema;
let apiSchema = new Schema({
  _id: Number,
  name: String,
  key: String,
  secret: String,
  domains: Array,
  isActive: Boolean,
  isDeleted: Boolean,
  userId: Number,
  collections: [{
    type: Number,
    ref: 'collections'
  }],
  createdBy: Number,
  updatedBy: Number

});
apiSchema.plugin(timestamps);
module.exports = mongoose.model('apps', apiSchema);
