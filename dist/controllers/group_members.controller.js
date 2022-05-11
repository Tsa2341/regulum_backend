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

var _user = _interopRequireDefault(require("../services/user.services"));

var GroupMemberControllers = /*#__PURE__*/function () {
  function GroupMemberControllers() {
    (0, _classCallCheck2["default"])(this, GroupMemberControllers);
  }

  (0, _createClass2["default"])(GroupMemberControllers, [{
    key: "getMembers",
    value: function () {
      var _getMembers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var type, userMember, users;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                type = String(req.params.type).toUpperCase();
                _context.next = 4;
                return new _user["default"]().checkUserIfMember({
                  user_id: req.user.id,
                  group_id: req.params.groupId
                });

              case 4:
                userMember = _context.sent;

                if (userMember) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", res.status(401).json({
                  message: "Access Denied, Group doesn't or you are not a member of this group"
                }));

              case 7:
                _context.next = 9;
                return new _user["default"]().getMembers(type, req.params.groupId, req.user.id);

              case 9:
                users = _context.sent;
                res.status(200).json({
                  message: 'Retrieved group members successfully',
                  data: users
                });
                _context.next = 16;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  message: 'An unexpected error occured',
                  error: _context.t0.message && _context.t0.message.replace(/[`'"]+/gi, '')
                }));

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 13]]);
      }));

      function getMembers(_x, _x2) {
        return _getMembers.apply(this, arguments);
      }

      return getMembers;
    }()
  }, {
    key: "addMembers",
    value: function () {
      var _addMembers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var user_ids, i, user_id, user, userMember;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                user_ids = req.body.user_ids;
                i = 0;

              case 3:
                if (!(i < user_ids.length)) {
                  _context3.next = 18;
                  break;
                }

                user_id = user_ids[i];
                _context3.next = 7;
                return new _user["default"]().getUser({
                  id: user_id
                });

              case 7:
                user = _context3.sent;
                _context3.next = 10;
                return new _user["default"]().checkUserIfMember({
                  user_id: user_id,
                  group_id: req.params.groupId
                });

              case 10:
                userMember = _context3.sent;

                if (user) {
                  _context3.next = 13;
                  break;
                }

                return _context3.abrupt("return", res.status(404).json({
                  message: "User doesn't exist"
                }));

              case 13:
                if (!userMember) {
                  _context3.next = 15;
                  break;
                }

                return _context3.abrupt("return", res.status(409).json({
                  message: 'User is already a member in this group'
                }));

              case 15:
                i++;
                _context3.next = 3;
                break;

              case 18:
                user_ids.map( /*#__PURE__*/function () {
                  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(user_id) {
                    return _regenerator["default"].wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return new _user["default"]().addMembers({
                              user_id: user_id,
                              group_id: req.params.groupId,
                              user_role: 'MEMBER'
                            });

                          case 2:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x5) {
                    return _ref.apply(this, arguments);
                  };
                }());
                return _context3.abrupt("return", res.status(201).json({
                  message: 'Added all members successfully'
                }));

              case 22:
                _context3.prev = 22;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(500).json({
                  message: 'An unexpected error occured',
                  error: _context3.t0.message && _context3.t0.message.replace(/[`'"]+/gi, '')
                }));

              case 25:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 22]]);
      }));

      function addMembers(_x3, _x4) {
        return _addMembers.apply(this, arguments);
      }

      return addMembers;
    }()
  }, {
    key: "deleteMembers",
    value: function () {
      var _deleteMembers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var user_ids, i, user_id, user, userMember;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                user_ids = req.body.user_ids;
                i = 0;

              case 3:
                if (!(i < user_ids.length)) {
                  _context5.next = 20;
                  break;
                }

                user_id = user_ids[i];
                _context5.next = 7;
                return new _user["default"]().getUser({
                  id: user_id
                });

              case 7:
                user = _context5.sent;
                _context5.next = 10;
                return new _user["default"]().checkUserIfMember({
                  user_id: user_id,
                  group_id: req.params.groupId
                });

              case 10:
                userMember = _context5.sent;

                if (user) {
                  _context5.next = 13;
                  break;
                }

                return _context5.abrupt("return", res.status(404).json({
                  message: "User doesn't exist"
                }));

              case 13:
                if (userMember) {
                  _context5.next = 15;
                  break;
                }

                return _context5.abrupt("return", res.status(409).json({
                  message: 'User is not a member of this group'
                }));

              case 15:
                if (!(userMember.user_role !== 'MEMBER')) {
                  _context5.next = 17;
                  break;
                }

                return _context5.abrupt("return", res.status(400).json({
                  message: "Access denied, can't delete an admin"
                }));

              case 17:
                i++;
                _context5.next = 3;
                break;

              case 20:
                user_ids.map( /*#__PURE__*/function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(user_id) {
                    return _regenerator["default"].wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.next = 2;
                            return new _user["default"]().deleteMembers({
                              user_id: user_id,
                              group_id: req.params.groupId,
                              user_role: 'MEMBER'
                            });

                          case 2:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  return function (_x8) {
                    return _ref2.apply(this, arguments);
                  };
                }());
                return _context5.abrupt("return", res.status(201).json({
                  message: 'Deleted all members successfully'
                }));

              case 24:
                _context5.prev = 24;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", res.status(500).json({
                  message: 'An unexpected error occured',
                  error: _context5.t0.message && _context5.t0.message.replace(/[`'"]+/gi, '')
                }));

              case 27:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 24]]);
      }));

      function deleteMembers(_x6, _x7) {
        return _deleteMembers.apply(this, arguments);
      }

      return deleteMembers;
    }()
  }]);
  return GroupMemberControllers;
}();

exports["default"] = GroupMemberControllers;