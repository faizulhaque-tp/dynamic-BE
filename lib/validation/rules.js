'use strict';

const appName = {
  isAlphanumeric: {
    args: true,
    msg: 'Name should be in Letters and Numbers only'
  },
  notEmpty: {
    args: true,
    msg: 'Name cannot be empty'
  },
  notNull: {
    args: true,
    msg: 'Name cannot be null'
  }
};

const appKey = {
  isAlphanumeric: {
    args: true,
    msg: 'Application key generated should be in Letters and Numbers only'
  },
  notEmpty: {
    args: true,
    msg: 'Unable to generate key'
  },
  len: {
    args: [10, 10],
    msg: "Application key should be of 10 length."
  }
};

const appSecret = {
  isAlphanumeric: {
    args: true,
    msg: 'Application secret generated should be in Letters and Numbers only'
  },
  notEmpty: {
    args: true,
    msg: 'Unable to generate application secret'
  },
  len: {
    args: [15, 15],
    msg: "Application key should be of 10 length."
  }
};

const bool = {
  isIn: {
    args: [[1, 0]],
    msg: "Only boolean value in 1 and 0 format accepted"
  }
};

const appDomain = {
  isDomainArray: {
    args: true,
    msg: "Domain field only accepts valid URLs."
  }
};

const ID = {
  isNumeric: {
    args: true,
    msg: "ID must be numeric"
  },
  notEmpty: {
    args: true,
    msg: 'ID cannot be empty'
  },
  len: {
    args: [19, 19],
    msg: 'ID length must lie in specified range'
  }
};

module.exports = {
  appName,
  appKey,
  appSecret,
  bool,
  appDomain,
  ID
};

