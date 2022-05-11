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

var _admin = _interopRequireDefault(require("../services/admin.services"));

var AdminControllers = /*#__PURE__*/function () {
  function AdminControllers() {
    (0, _classCallCheck2["default"])(this, AdminControllers);
  }

  (0, _createClass2["default"])(AdminControllers, [{
    key: "createAdmin",
    value: function () {
      var _createAdmin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, user_id, group_id, user_role, adminExist, admin;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, user_id = _req$body.user_id, group_id = _req$body.group_id, user_role = _req$body.user_role;
                _context.next = 4;
                return new _admin["default"]().findAdmin({
                  user_id: user_id,
                  group_id: group_id,
                  user_role: user_role
                });

              case 4:
                adminExist = _context.sent;
                console.log(adminExist);

                if (!adminExist) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", res.status(409).json({
                  message: "User with role ".concat(user_role, " already exist in the group")
                }));

              case 8:
                _context.next = 10;
                return new _admin["default"]().createAdmin({
                  user_id: user_id,
                  group_id: group_id,
                  user_role: user_role
                });

              case 10:
                admin = _context.sent;
                return _context.abrupt("return", res.status(201).json({
                  message: 'Created admin successfully',
                  data: admin
                }));

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  message: 'An unexpected error occured',
                  error: _context.t0.message && _context.t0.message.replace(/[`'"]+/gi, '')
                }));

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 14]]);
      }));

      function createAdmin(_x, _x2) {
        return _createAdmin.apply(this, arguments);
      }

      return createAdmin;
    }()
  }, {
    key: "getAdminUser",
    value: function () {
      var _getAdminUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getAdminUser(_x3) {
        return _getAdminUser.apply(this, arguments);
      }

      return getAdminUser;
    }()
  }]);
  return AdminControllers;
}();

exports["default"] = AdminControllers;