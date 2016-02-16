var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountLookUp = new Schema ({
	accountId: String,
	userId: String,
	password: String,
	isActive: Boolean,
	isDeleted: Boolean,
	createdAt: Number,
	updatedAt: Number,

});

var account = mongoose.model('account',accountLookUp)
module.exports = account;
