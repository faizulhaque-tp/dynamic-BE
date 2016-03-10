'use strict';

module.exports = {
  generateID,
  checkBooleanPair
};

function generateID() {
  let random = Math.round(Math.random() * 900000) + 100000;
  return parseInt(new Date().getTime().toString() + random.toString());
}

function checkBooleanPair(value1, value2) {
  return value1 != value2;
}