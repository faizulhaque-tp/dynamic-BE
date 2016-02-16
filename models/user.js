var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
	_id :Number,
	name: String,


});

var user = mongoose.model('collections',userSchema)
module.exports = user;
