var expressValidator  = require('express-validator');



module.exports = expressValidator({
  customValidators: {
    isFieldAvailable: function(username,model,attribute) {
      return new Promise(function(resolve, reject) {
	var query ={};	
	query[attribute] = username;

	model.findOne({query},function(err,user){


		if(err){
			reject(Error('An Error Occured'));
		}
		if(user && user.name){
			reject(Error('exists'));
		}else{
			resolve('available');
		}


	});


    });
  }
}
});


