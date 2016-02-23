var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new Schema ({
	_id :Number,
	name:  { type: String  }
});
userSchema.plugin(uniqueValidator);

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

var user = mongoose.model('user',userSchema)

module.exports = user;
