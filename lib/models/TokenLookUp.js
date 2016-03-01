var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


var Schema = mongoose.Schema;

var tokenLookUpSchema = new Schema ({
	_id:Number,
	userId: String,
	accessToken: String,
	createdAt: Number
});

var tokenLookUp = mongoose.model('tokenLookUp',tokenLookUpSchema)
module.exports = tokenLookUp;
