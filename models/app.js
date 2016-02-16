var mongoose = require('mongoose');
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
	name: String,
	key: String,
	secret: String,
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

var myApp = mongoose.model('myApp',apiSchema)
module.exports = myApp;
