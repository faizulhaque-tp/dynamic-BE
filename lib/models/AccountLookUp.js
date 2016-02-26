'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

let Schema = mongoose.Schema;
let accountLookUp = new Schema({
  _id: String,
  userId: {type: Number, required: true},
  password: {type: String, required: true},
  isActive: Boolean,
  isDeleted: Boolean,
  createdAt: Number,
  updatedAt: Number
});

//set alias accountId for _id field
accountLookUp.virtual('accountId').get(function () {
  return this._id;
});

// Ensure virtual fields are serialised.
// Removes 'id' and '_id' field from JSON response
accountLookUp.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret._id;
    delete ret.id;
  },
  virtuals: true
});

module.exports = mongoose.model('accounts', accountLookUp);
