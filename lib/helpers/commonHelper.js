'use strict';

module.exports = {
  generateID
};

function generateID() {
  let random = Math.floor(Math.random() * 900000) + 100000;
  return parseInt(new Date().getTime().toString() + random.toString());
}