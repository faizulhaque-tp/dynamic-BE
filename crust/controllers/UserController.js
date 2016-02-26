exports.Register = function (req, res) {

  var util = require('util');
  var userFacade = require('../../lib/facade/UserFacade');
  var userM = require('../../lib/models/User');
  var appM = require('../../lib/models/App');
  var accountLoopUpM = require('../../lib/models/AccountLookUp');

  req.checkBody('devloperName', 'Developer Name  is required').notEmpty();
  req.checkBody('userName', 'User Name is required').notEmpty();
  req.checkBody('appName', 'App Name is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();

  req.check('devloperName', 'devloperName Taken').isFieldAvailable(userM, 'name');

  req.check('userName', 'Username Taken').isFieldAvailable(accountLoopUpM, 'accountId');

  req.check('appName', 'Username Taken').isFieldAvailable(appM, 'name');

  req.asyncValidationErrors().then(function () {
    userFacade.saveUser(req.body.devloperName, req.body.userName, req.body.password, req.body.appName).then(function () {
      res.status(200).end('User saved');

    }).catch(function (error) {
      res.status(400).end('Unable to save user an error occured');

    });


  }).catch(function (errors) {
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
