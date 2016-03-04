'use strict';
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
mongoose.Promise = require('bluebird');

let Schema = mongoose.Schema;
let accountLookUp = new Schema({
  _id: String,
  userId: {type: Number, required: true},
  password: {type: String, required: true},
  isActive: Boolean,
  isDeleted: Boolean
});

//set alias accountId for _id field
accountLookUp.virtual('accountId').get(function () {
  return this._id;
}).set(function (accountId) {
    this.set('_id', accountId);
});

accountLookUp.statics.Authenticate = function(username,password){
    return this.findOne({'_id':username,'password':password,'isActive':1,'isDeleted':0});
};

// Ensure virtual fields are serialised.
// Removes 'id' and '_id' field from JSON response
accountLookUp.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret._id;
    delete ret.id;
  },
  virtuals: true
});

accountLookUp.plugin(timestamps);

module.exports = mongoose.model('accounts', accountLookUp);
