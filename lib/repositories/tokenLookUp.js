'use strict';

const TokenLookUp = require('../models/TokenLookUp');
const helper = require('../helpers/commonHelper');
module.exports = {
  find,
  create
};

function find(user){
  return TokenLookUp.findOne({userId: user.userId}).select({"accessToken": 1, "_id": 0});
}

function create(token, userId){
  let tokenLookUp = new TokenLookUp({
    _id: helper.generateID(),
    userId: userId,
    accessToken: token
  });
  return tokenLookUp.save();
}
