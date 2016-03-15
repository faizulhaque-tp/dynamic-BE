'use strict';

const expressValidator = require('express-validator');

module.exports = expressValidator({
  errorFormatter: function(param, msg, value) {
     var namespace = param.split('.')
     , root    = namespace.shift()
     , formParam = root;

   while(namespace.length) {
     formParam += '[' + namespace.shift() + ']';
   }
   return msg;
 },
  customValidators: {
    isFieldAvailable: function (username, model, attribute) {
      return new Promise(function (resolve, reject) {
        var query = {};
        query[attribute] = username;

        model.findOne({query}, function (err, user) {


          if (err) {
            reject(Error('An Error Occured'));
          }
          if (user && user.name) {
            reject(Error('exists'));
          } else {
            resolve('available');
          }


        });


      });
    }
  }
});
