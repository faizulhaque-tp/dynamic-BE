'use strict';
const rand = require("random-key");

module.exports = {
  generateID,
  checkBooleanPair
};

function generateID() {
  // limited to length of 15 
  let random = rand.generateDigits(2);
  return parseInt(new Date().getTime().toString() + random.toString());
}

function checkBooleanPair(value1, value2) {
  return value1 != value2;
}
