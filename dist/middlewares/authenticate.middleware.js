"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = authenticate;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require('../utils/user.util'),
    verifyToken = _require.verifyToken;

function authenticate(_x, _x2, _x3) {
  return _authenticate.apply(this, arguments);
}

function _authenticate() {
  _authenticate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, valid;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            token = req.cookies.token;
            _context.t0 = token;

            if (!_context.t0) {
              _context.next = 7;
              break;
            }

            _context.next = 6;
            return verifyToken(token);

          case 6:
            _context.t0 = _context.sent;

          case 7:
            valid = _context.t0;

            if (!(!token || !valid)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              message: 'seems like you are not logged in, please login'
            }));

          case 10:
            req.user = {
              email: valid.email,
              id: valid.id
            };
            next();
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t1 = _context["catch"](0);
            return _context.abrupt("return", res.status(401).json({
              message: 'An unexpected error occured',
              data: _context.t1.message
            }));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));
  return _authenticate.apply(this, arguments);
}