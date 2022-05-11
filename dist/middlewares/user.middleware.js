"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyEmailExist = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../database/models");

var verifyEmailExist = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var email, verifyEmail;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = req.body.email;
            _context.next = 3;
            return _models.User.findOne({
              where: {
                email: email
              }
            });

          case 3:
            verifyEmail = _context.sent;

            if (!verifyEmail) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(409).json({
              message: "User with email ".concat(email, " already exist")
            }));

          case 6:
            next();

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function verifyEmailExist(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyEmailExist = verifyEmailExist;