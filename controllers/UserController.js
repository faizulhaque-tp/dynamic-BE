exports.Register = function (req,res){
	var util = require('util');
	var userFacade = require('../facade/UserFacade');
	req.checkBody(	'devloperName', 'Developer Name is required').notEmpty();
	req.checkBody('userName', 'User Name is required').notEmpty();
	req.checkBody('appName', 'App Name is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	var errors = req.validationErrors();
  	if (errors) {
	    res.status(400).send((errors));
	    return;
	}
	userFacade.saveUser(req.body.devloperName,req.body.userName,req.body.password,req.body.appName).then(function(){
		console.log('usersaved');
	}).catch(function(error){
		console.log('Main error error'+error);
	});

///	res.render('index', { title: 'Express' });
}
