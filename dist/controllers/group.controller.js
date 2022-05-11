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

var _group = _interopRequireDefault(require("../services/group.service"));

var _user = _interopRequireDefault(require("../services/user.services"));

var GroupController = /*#__PURE__*/function () {
  function GroupController() {
    (0, _classCallCheck2["default"])(this, GroupController);
  }

  (0, _createClass2["default"])(GroupController, [{
    key: "getUserGroups",
    value: // get all users group info
    function () {
      var _getUserGroups = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var group;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return new _group["default"]().getUserGroups({
                  id: req.user.id
                });

              case 3:
                group = _context.sent;
                return _context.abrupt("return", res.status(200).json({
                  message: 'Retrieved group data successfully',
                  data: group
                }));

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);
                return _context.abrupt("return", res.status(500).json({
                  message: 'An unexpected error occured',
                  error: _context.t0.message && _context.t0.message.replace(/[`'"]+/gi, '')
                }));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function getUserGroups(_x, _x2) {
        return _getUserGroups.apply(this, arguments);
      }

      return getUserGroups;
    }() // get all groups

  }, {
    key: "getAllGroups",
    value: function () {
      var _getAllGroups = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var groups;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return new _group["default"]().getAllGroups();

              case 3:
                groups = _context2.sent;
                res.status(200).json({
                  message: 'retrieved all groups successfully',
                  data: groups
                });
                _context2.next = 10;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(500).json({
                  message: 'An unexpected error occured',
                  error: _context2.t0.message && _context2.t0.message.replace(/[`'"]+/gi, '')
                }));

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
      }));

      function getAllGroups(_x3, _x4) {
        return _getAllGroups.apply(this, arguments);
      }

      return getAllGroups;
    }() // create a user group

  }, {
    key: "createGroup",
    value: function () {
      var _createGroup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var newGroup, updatedGroup;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                req.body.created_by = req.user.id;
                _context3.next = 4;
                return new _group["default"]().createGroup(req.body);

              case 4:
                newGroup = _context3.sent;
                _context3.next = 7;
                return new _group["default"]().createMember({
                  user_id: req.user.id,
                  group_id: newGroup.id,
                  user_role: 'ADMIN'
                });

              case 7:
                _context3.next = 9;
                return new _group["default"]().getGroup({
                  id: newGroup.id
                });

              case 9:
                updatedGroup = _context3.sent;
                return _context3.abrupt("return", res.status(201).json({
                  message: 'group created successfully',
                  data: updatedGroup
                }));

              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](0);

                if (!_context3.t0.errors) {
                  _context3.next = 17;
                  break;
                }

                return _context3.abrupt("return", res.status(406).json({
                  message: _context3.t0.errors[0].message.replace(/[`'"]+/gi, '')
                }));

              case 17:
                return _context3.abrupt("return", res.status(500).json({
                  message: 'An unexpected error occured',
                  error: _context3.t0.message && _context3.t0.message.replace(/[`'"]+/gi, '')
                }));

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 13]]);
      }));

      function createGroup(_x5, _x6) {
        return _createGroup.apply(this, arguments);
      }

      return createGroup;
    }() // update a user group

  }, {
    key: "updateGroup",
    value: function () {
      var _updateGroup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var userMember, updatedGroup;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return new _user["default"]().checkUserIfMember({
                  user_id: req.user.id,
                  group_id: req.params.id
                });

              case 3:
                userMember = _context4.sent;

                if (userMember) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt("return", res.status(401).json({
                  message: "Access denied,Group doesn't exist or You are not the member of this group"
                }));

              case 6:
                _context4.next = 8;
                return new _group["default"]().updateGroup(req.body, req.params.id);

              case 8:
                updatedGroup = _context4.sent;
                return _context4.abrupt("return", res.status(200).json({
                  message: 'Updated group data successfully',
                  data: updatedGroup
                }));

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", res.status(500).json({
                  message: 'An unexpected error occured',
                  error: _context4.t0.message && _context4.t0.message.replace(/[`'"]+/gi, '')
                }));

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 12]]);
      }));

      function updateGroup(_x7, _x8) {
        return _updateGroup.apply(this, arguments);
      }

      return updateGroup;
    }() // delete a user group

  }, {
    key: "deleteGroup",
    value: function () {
      var _deleteGroup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var group, users, i;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return new _group["default"]().getGroup({
                  id: req.params.id
                });

              case 3:
                group = _context5.sent;

                if (group) {
                  _context5.next = 6;
                  break;
                }

                return _context5.abrupt("return", res.status(404).json({
                  message: "Group doesn't exist"
                }));

              case 6:
                users = group.users; // check if the requester is a member of the group

                i = 0;

              case 8:
                if (!(i < users.length)) {
                  _context5.next = 18;
                  break;
                }

                if (!(users[i].id === req.user.id)) {
                  _context5.next = 15;
                  break;
                }

                _context5.next = 12;
                return new _group["default"]().deleteGroup({
                  id: req.params.id
                });

              case 12:
                _context5.next = 14;
                return res.status(200).json({
                  message: 'Deleted group successfully'
                });

              case 14:
                return _context5.abrupt("return", _context5.sent);

              case 15:
                i++;
                _context5.next = 8;
                break;

              case 18:
                return _context5.abrupt("return", res.status(401).json({
                  message: 'Access denied, You are not the member of this group'
                }));

              case 21:
                _context5.prev = 21;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", res.status(500).json({
                  message: 'An unexpected error occured',
                  error: _context5.t0.message && _context5.t0.message.replace(/[`'"]+/gi, '')
                }));

              case 24:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 21]]);
      }));

      function deleteGroup(_x9, _x10) {
        return _deleteGroup.apply(this, arguments);
      }

      return deleteGroup;
    }()
  }]);
  return GroupController;
}();

exports["default"] = GroupController;