var jwt    = require('jsonwebtoken');
var AppErrors    = require('../helpers/apperrors');
var tokenLookUp  = require('../models/tokenLookUp');


exports.logOutUser = function (userId,token){

	return tokenLookUp.findOneAndRemove({userId:userId,accessToken:token}).then(function(object){
		console.log(object);
		if(!object){
			console.log('not found');
			throw new AppErrors.unAuthenticatedError('User not found');
		}
		
	});

}

exports.verifyToken = function (token){

  
 

    // verifies secret and checks exp
    return new Promise(function(resolve, reject) {     
    return jwt.verify(token, config.secret, function(err, decoded) { 
    	
    			if(err){
    				
   					reject(new AppErrors.unAuthenticatedError(err));

    			}else{
    				 tokenLookUp.findOne({accessToken:token}).exec(function(err,result){
    					if(err){
    						reject(new AppErrors.unAuthenticatedError(err));
    					}else{
    						if(result && result.accessToken !=null){
    							resolve({response:'success',decoded:decoded});
    						}else
    						reject(new AppErrors.unAuthenticatedError('Please login prior to use api services'));
    					}
    					
    				}  );
    				

    				
    			}
    	});	
  
      
    });

  
}

exports.createToken = function (username,password,next){
	
	

	var userAccount = require('../models/accountLookUp');
	var tokenTable = require('../models/tokenLookUp');
  	
  	return userAccount.Authenticate(username,password).then(function (value){
  		console.log(value);
  		if(value && value.userId && value.userId >0  ){
  			
  				var token = jwt.sign(value.userId, config.secret);
  				console.log(token);
  				return tokenTable.update({userId:value.userId},{accessToken:token},{upsert:true}).then(function(value){
  					console.log()
  					var mObj  = {'token':token};
  						
  					return mObj;
					
					
  				}).catch(
  					function (errors){
  						throw new AppErrors.unAuthenticatedError('unable to created token');
  					}
  				)
  				;
  				/*return tokenTable.update({userId:value.userId},{accessToken:token},{upsert:true},function(error,db){
  					if(error) throw error;
  					var lObj  = {'token':token}	;
  					console.log(lObj);
  					return lObj;
  					

  				});*/
  			
  			
  			

  		}else{
  			throw new AppErrors.unAuthenticatedError('User Not Found');
  			
  		}
		
  	}).catch(function (errors){
  		throw errors;
  	} );
  	


};

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
		return	Promise.all([userAccount.save(),appObj.save()]);
						/*.spread(function(a, b){
							return {
								results: {
									a: a,
									b: b,
									c: value
									}
								};
								});
						*/
	})
	/*.then(function(value){
		console.log('comming transaction'+value);
//		value.db.db.command(“commitTransaction”);
	}).catch( function(error){
		console.log('rolling back transaction'+error);

		throw error;
		

	} ); */

}


