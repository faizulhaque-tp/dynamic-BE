'use strict';
const commonHelper = require('../helpers/commonHelper');

var jwt = require('jsonwebtoken');
var AppErrors = require('../helpers/apperrors');
var tokenLookUp = require('../models/TokenLookUp');
var userAccount = require('../models/AccountLookUp');


exports.logOutUser = function (userId, token) {
    return tokenLookUp.findOneAndRemove({userId: userId, accessToken: token}).then(function (object) {
        if (!object) {
            throw new AppErrors.unAuthenticatedError('User not found');
        }
    });
}

exports.verifyToken = function (token) {
    // verifies secret and checks exp
    return new Promise(function (resolve, reject) {
        return jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                reject(new AppErrors.unAuthenticatedError(err));

            } else {
                tokenLookUp.findOne({accessToken: token}).exec(function (err, result) {
                    if (err) {
                        reject(new AppErrors.unAuthenticatedError(err));
                    } else {
                        if (result && result.accessToken != null) {
                            resolve({response: 'success', decoded: decoded});
                        } else
                            reject(new AppErrors.unAuthenticatedError('Please login prior to use api services'));
                    }
                });
            }
        });
    });
}

exports.createToken = function (username, password, next) {




    return userAccount.Authenticate(username, password).then(function (value) {
        if (value && value.userId && value.userId > 0) {

            var token = jwt.sign(value.userId, config.secret);
            return tokenLookUp.update({userId: value.userId}, {accessToken: token}, {upsert: true}).then(function (value) {
                var mObj = {'token': token};
                return mObj;

            }).catch(
                function (errors) {
                    throw new AppErrors.unAuthenticatedError('unable to created token');
                }
            )
        } else {
            throw new AppErrors.unAuthenticatedError('User Not Found');

        }

    }).catch(function (errors) {
            throw errors;
        });


};


exports.saveUser = function (devloperName, userName, password, appName) {

    var userM = require('../../lib/models/User');
    var appM = require('../../lib/models/App');
    var accountLoopUpM = require('../../lib/models/AccountLookUp');


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


