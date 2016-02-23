var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var rules = new Schema ({
	add: String,
	update: String,
	delete: String,
});

var collections = new Schema ({
	name: String,
	rules: [rules],
	createdAt: Number,
	updatedAt: Number,
});

var apiSchema = new Schema ({
	_id:Number,
	name: { type: String, required: true, unique: true },
	key: { type: String, required: true},
	secret: { type: String, required: true} ,
	domains: Array,
	isActive: Boolean,
	isDeleted: Boolean,
	userId: Number,
	collections:[collections],
	createdAt: Number,
	updatedAt: Number,
	createdBy: Number,
	updatedBy: Number

});



apiSchema.pre('save', function(next) {
var counterModel  = require('./counter');
    var doc = this;
    counterModel.findByIdAndUpdate({_id: 'appId'}, {$inc: { seq: 1} }, function(error, counterModel)   {
        if(error)
            return next(error);
	if(!(counterModel)){
	var newCounterModel  = require('./counter');
		var firstCounter  = 	new newCounterModel({'_id':'appId','seq':2});
		firstCounter.save();
	       doc._id = 1;
	}else
        doc._id = counterModel.seq || 1;
       next();
    });
});




var myApp = mongoose.model('myApp',apiSchema)
module.exports = myApp;
