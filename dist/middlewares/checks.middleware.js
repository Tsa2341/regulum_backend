"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkSuperAdmin = exports.CheckGroup = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../services/user.services"));

var checkSuperAdmin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(req.user.email === 'alanshema2002@gmail.com')) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", next());

          case 2:
            return _context.abrupt("return", res.status(401).json({
              message: 'Access denied, Please login as a Super Admin'
            }));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function checkSuperAdmin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.checkSuperAdmin = checkSuperAdmin;

var CheckGroup = /*#__PURE__*/function () {
  function CheckGroup(req, res, next) {
    (0, _classCallCheck2["default"])(this, CheckGroup);
    this.req = req;
    this.res = res;
    this.next = next;
  }

  (0, _createClass2["default"])(CheckGroup, [{
    key: "type",
    value: function () {
      var _type2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_type) {
        var requesterMember;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return new _user["default"]().checkUserIfMember({
                  user_id: this.req.user.id,
                  group_id: this.req.params.groupId
                });

              case 2:
                requesterMember = _context2.sent;

                if (requesterMember) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", this.res.status(404).json({
                  message: "You are not a member of this group or the Group specified doesn't exist"
                }));

              case 5:
                if (!(requesterMember.user_role !== _type)) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", this.res.status(401).json({
                  message: 'Access denied, You are not an admin of this group'
                }));

              case 7:
                this.next();

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function type(_x4) {
        return _type2.apply(this, arguments);
      }

      return type;
    }()
  }]);
  return CheckGroup;
}();

exports.CheckGroup = CheckGroup;