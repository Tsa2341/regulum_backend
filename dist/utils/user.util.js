"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.generateToken = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("dotenv");

var _paseto = require("paseto");

var _crypto = require("crypto");

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

var sign = _paseto.V4.sign,
    verify = _paseto.V4.verify;
(0, _crypto.generateKeyPair)('ed25519', {
  modulusLength: 4096,
  // It holds a number. It is the key size in bits and is applicable for RSA, and DSA algorithm only.
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    //Note again the type is set to pkcs1
    format: 'pem' //cipher: "aes-256-cbc", //Optional
    //passphrase: "", //Optional

  }
}, function (err, publicKey, privateKey) {
  // Handle errors and use the generated key pair.
  if (err) return console.log('Error! = ', err);

  try {
    (0, _fs.accessSync)(_path["default"].join(__dirname, '../../keys/privateKey.text'));
  } catch (error) {
    (0, _fs.appendFileSync)(_path["default"].join(__dirname, '../../keys/privateKey.text'), privateKey);
  }
});

var generateToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email, id) {
    var key;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            key = (0, _fs.readFileSync)(_path["default"].join(__dirname, '../../keys/privateKey.text'));
            return _context.abrupt("return", sign({
              email: email,
              id: id
            }, key.toString('ascii')));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function generateToken(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.generateToken = generateToken;

var verifyToken = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(token) {
    var key;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            key = (0, _fs.readFileSync)(_path["default"].join(__dirname, '../../keys/privateKey.text'));
            return _context2.abrupt("return", verify(token, key.toString('ascii')));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function verifyToken(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;