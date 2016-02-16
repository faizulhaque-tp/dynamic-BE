var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tokenLookUpSchema = new Schema ({
	_id:Number,
	userId: String,
	accessToken: String,
	createdAt: Number,

});

var tokenLookUp = mongoose.model('collections',tokenLookUpSchema)
module.exports = tokenLookUp;
