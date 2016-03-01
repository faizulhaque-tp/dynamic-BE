'use strict';
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.Promise = require('bluebird');

let User = new mongoose.Schema({
  _id: Number,
  name: String
});
User.plugin(uniqueValidator);


/*
userSchema.pre('save', function(next) {
    var counterModel  = require('./counter');
    var doc = this;
    counterModel.findByIdAndUpdate({_id: 'userId'}, {$inc: { seq: 1} }, function(error, counterModel)   {
        if(error)
            return next(error);
        if(!(counterModel)){
            var newCounterModel  = require('./counter');
            var firstCounter  = 	new newCounterModel({'_id':'userId','seq':2});
            firstCounter.save();
            doc._id = 1;
        }else
            doc._id = counterModel.seq || 1;
        next();
    });
});
*/


module.exports = mongoose.model('users', User);
