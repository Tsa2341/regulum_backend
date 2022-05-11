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

var AdminServices = /*#__PURE__*/function () {
  function AdminServices() {
    (0, _classCallCheck2["default"])(this, AdminServices);
  }

  (0, _createClass2["default"])(AdminServices, [{
    key: "createAdmin",
    value: function () {
      var _createAdmin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
        var user_id, group_id, user_role;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user_id = data.user_id, group_id = data.group_id, user_role = data.user_role;
                _context.next = 3;
                return _models.User_Group.create({
                  user_id: user_id,
                  group_id: group_id,
                  user_role: user_role
                });

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createAdmin(_x) {
        return _createAdmin.apply(this, arguments);
      }

      return createAdmin;
    }()
  }, {
    key: "findAdmin",
    value: function () {
      var _findAdmin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
        var user_id, group_id, user_role;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                user_id = data.user_id, group_id = data.group_id, user_role = data.user_role;
                _context2.next = 3;
                return _models.User_Group.findOne({
                  where: {
                    user_id: user_id,
                    group_id: group_id,
                    user_role: user_role
                  }
                });

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function findAdmin(_x2) {
        return _findAdmin.apply(this, arguments);
      }

      return findAdmin;
    }()
  }]);
  return AdminServices;
}();

exports["default"] = AdminServices;