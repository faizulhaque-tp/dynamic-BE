'use strict';
const commonHelper = require('../helpers/commonHelper');

exports.saveUser = function (devloperName, userName, password, appName) {
  var userM = require('../models/User');
  var accountLoopUpM = require('../models/AccountLookUp');
  var appM = require('../models/App');
  var rand = require("random-key");
  var user = new userM({
    _id: commonHelper.generateID(),
    'name': devloperName
  });
  return user.save()
    .then(function (value) {
      console.log('inside save user' + value);
      var userAccount = new accountLoopUpM({
        _id: userName,
        userId: value._id,
        password: password,
        isActive: 1,
        isDeleted: 0,
        createdAt: new Date().getTime()
      });
      var appObj = new appM({
        _id: commonHelper.generateID(),
        name: appName,
        key: rand.generate(10),
        secret: rand.generate(15),
        isActive: 1,
        isDeleted: 0,
        userId: user._id,
        createdAt: new Date().getTime()
      });
      return Promise.all([userAccount.save(), appObj.save()]);
  });

};


