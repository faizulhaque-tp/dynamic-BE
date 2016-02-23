exports.saveUser =  function(devloperName,userName,password,appName){
	var userM = require('../models/user');
	var accountLoopUpM = require('../models/accountLookUp');
	var appM = require('../models/app');
	var rand = require("random-key");
	var user  = new userM({'name':devloperName});	

	return 	user.save().then(function (value){

	 	  console.log('inside save user'+value);
		 var userAccount = new accountLoopUpM({
	    		accountId: userName,
	       	        userId: value._id,    
	       	        password: password,
			isActive: 1,
			isDeleted: 0,
			createdAt: new Date().getTime()
		 });
		var appObj  =  new appM({
			name: appName,
			key:	rand.generate(10),
			secret: rand.generate(15),
			isActive: 1,
			isDeleted: 0,
	       	        userId: user._id,    
			createdAt: new Date().getTime()
		});
		return	Promise.all([userAccount.save(),appObj.save()]).spread(function(a, b){
return {
results: {
a: a,
b: b,
c: value
}
};
});
	})
	.then(function(value){
		console.log('comming transaction'+value);
//		value.db.db.command(“commitTransaction”);
	}).catch( function(error){
		console.log('rolling back transaction'+error);

		throw error;
		

	} );

}


