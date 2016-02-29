var util = require('util');
var  userFacade = require ('../facade/UserFacade');
exports.Logout = function (req,res,next){
	console.log('inside logout');
	console.log(req.body.token);
	console.log(req.body.decoded);
	req.checkBody('decoded', 'Invalid User').notEmpty();
	req.checkBody('decoded', 'Invalid User').isInt();
	var errors = req.validationErrors();
  	if (errors){
    	res.status(400).send('There have been validation errors: ' + util.inspect(errors));
    	return;
  	}
  	
  	userFacade.logOutUser(req.body.decoded,req.body.token).then(function(){

  		 res.status(200).send('User Logged out successuflly');
  		 return
  	}).catch(function(err){

  		next(err);
  	});

}

exports.verifyToken = function(req,res,next){
	console.log('inside verification');
	
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	userFacade.verifyToken(token).then(function(result){
		req.body.decoded=result.decoded;
		next();

	}).catch(
		function (err){
			console.log(err);
			next(err)
		}
	);




  // check header or url parameters or post parameters for token


}

exports.Authenticate = function (req,res,next){
	
	
	req.checkBody('userName', 'User Name is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	
	var errors = req.validationErrors();
  	if (errors){
    	res.status(400).send('There have been validation errors: ' + util.inspect(errors));
    	return;
  	}
  	userFacade.createToken(req.body.userName,req.body.password).
  	then(
  			function (value){
  				if(value.token){
  					value.message  ='Token Created successuflly';
  					res.status(201).send(value);
  					return;
  				}
  			}
  		).
  	catch(
  			function (err){
  					next(err)
  			}
  		);

  	

  	
  	


};
exports.Register = function (req,res){

	
	var userM = require('../models/user');
	var appM = require('../models/app');
	var accountLoopUpM = require('../models/accountLookUp');

	req.checkBody('devloperName', 'Developer Name  is required').notEmpty();
	req.checkBody('userName', 'User Name is required').notEmpty();
	req.checkBody('appName', 'App Name is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.check('devloperName', 'devloperName Taken').isFieldAvailable(userM,'name');
	req.check('userName', 'Username Taken').isFieldAvailable(accountLoopUpM,'accountId');
	req.check('appName', 'Username Taken').isFieldAvailable(appM,'name');
	req.asyncValidationErrors().then(function(){
	userFacade.saveUser(req.body.devloperName,req.body.userName,req.body.password,req.body.appName).then(function(){
		res.status(200).end('User saved');
	
	}).catch(function(error){
	res.status(400).end('Unable to save user an error occured');

	});


	}).catch(function(errors) {
		console.log('async');
	  res.status(400).send(errors);
	return false;
	});








/*	var errors = req.validationErrors();
  	if (errors) {
	    res.status(400).send((errors));
	    return;
	}
	return;
*/


///	res.render('index', { title: 'Express' });
}

