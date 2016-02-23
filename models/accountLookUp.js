var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var accountLookUp = new Schema ({
	accountId:{ type: String, required: true, unique: true },
	userId: { type: Number, required: true }, 
	password: { type: String, required: true } ,
	isActive: Boolean,
	isDeleted: Boolean,
	createdAt: Number,
	updatedAt: Number,

});

var account = mongoose.model('account',accountLookUp)
module.exports = account;
