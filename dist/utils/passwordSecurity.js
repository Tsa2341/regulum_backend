"use strict";

var _require = require('bcrypt'),
    genSaltSync = _require.genSaltSync,
    hashSync = _require.hashSync,
    compareSync = _require.compareSync;

function hashPassword(pass) {
  var salt = genSaltSync(10, 'b');
  return hashSync(pass, salt);
}

function verifyPassword(pass, hash) {
  return compareSync(pass, hash);
}

module.exports = {
  hashPassword: hashPassword,
  verifyPassword: verifyPassword
};