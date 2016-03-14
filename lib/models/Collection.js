'use strict';

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Collection = new Schema({
  _id: Number,
  name: String,
  rules: {
    create: Schema.Types.Mixed,
    update: Schema.Types.Mixed,
    delete: Schema.Types.Mixed
  },
  createdAt: Number,
  updatedAt: Number,
  isDeleted: Boolean
});

module.exports = mongoose.model('collections', Collection);
