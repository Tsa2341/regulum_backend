"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _models = require("../database/models");

var RandomServices = /*#__PURE__*/function () {
  function RandomServices() {
    (0, _classCallCheck2["default"])(this, RandomServices);
  }

  (0, _createClass2["default"])(RandomServices, [{
    key: "getWhitelistToken",
    value: function () {
      var _getWhitelistToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var list;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _models.Random.findAll({
                  where: {
                    name: 'whitelist_token'
                  }
                });

              case 2:
                list = _context.sent;
                return _context.abrupt("return", list);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getWhitelistToken() {
        return _getWhitelistToken.apply(this, arguments);
      }

      return getWhitelistToken;
    }()
  }, {
    key: "saveWhitelistToken",
    value: function () {
      var _saveWhitelistToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(token) {
        var newEntry;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _models.Random.create({
                  name: 'whitelist_token',
                  value: token
                });

              case 2:
                newEntry = _context2.sent;
                return _context2.abrupt("return", newEntry);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function saveWhitelistToken(_x) {
        return _saveWhitelistToken.apply(this, arguments);
      }

      return saveWhitelistToken;
    }()
  }]);
  return RandomServices;
}();

exports["default"] = RandomServices;