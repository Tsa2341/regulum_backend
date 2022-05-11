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

var _enum = require("../utils/enum.utils");

var GroupServices = /*#__PURE__*/function () {
  function GroupServices() {
    (0, _classCallCheck2["default"])(this, GroupServices);
  }

  (0, _createClass2["default"])(GroupServices, [{
    key: "getAllGroups",
    value: function () {
      var _getAllGroups = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _models.Group.findAll({
                  include: 'users'
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getAllGroups() {
        return _getAllGroups.apply(this, arguments);
      }

      return getAllGroups;
    }()
  }, {
    key: "getGroup",
    value: function () {
      var _getGroup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", _models.Group.findOne({
                  where: data,
                  include: 'users'
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getGroup(_x) {
        return _getGroup.apply(this, arguments);
      }

      return getGroup;
    }()
  }, {
    key: "getUserGroups",
    value: function () {
      var _getUserGroups = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(data) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", _models.Group.findAll({
                  include: [{
                    model: _models.User,
                    as: 'users',
                    where: data // through: {
                    // 	attributes: [],
                    // },

                  }]
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getUserGroups(_x2) {
        return _getUserGroups.apply(this, arguments);
      }

      return getUserGroups;
    }()
  }, {
    key: "createGroup",
    value: function () {
      var _createGroup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(data) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _models.Group.create(data);

              case 2:
                return _context4.abrupt("return", _context4.sent);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function createGroup(_x3) {
        return _createGroup.apply(this, arguments);
      }

      return createGroup;
    }()
  }, {
    key: "updateGroup",
    value: function () {
      var _updateGroup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(data, id) {
        var updateGroup, goal, description;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _models.Group.findOne({
                  where: {
                    id: id
                  }
                });

              case 2:
                updateGroup = _context5.sent;
                goal = data.goal, description = data.description;
                updateGroup.goal = goal || updateGroup.goal;
                updateGroup.description = description || updateGroup.description;
                _context5.next = 8;
                return updateGroup.save();

              case 8:
                return _context5.abrupt("return", updateGroup);

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function updateGroup(_x4, _x5) {
        return _updateGroup.apply(this, arguments);
      }

      return updateGroup;
    }()
  }, {
    key: "deleteGroup",
    value: function () {
      var _deleteGroup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(data) {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _models.Group.destroy({
                  where: data
                });

              case 2:
                return _context6.abrupt("return", _context6.sent);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function deleteGroup(_x6) {
        return _deleteGroup.apply(this, arguments);
      }

      return deleteGroup;
    }()
  }, {
    key: "getGroupUserCreated",
    value: function () {
      var _getGroupUserCreated = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(data) {
        var user_id;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                user_id = data.user_id;
                _context7.next = 3;
                return _models.Group.findAll({
                  where: {
                    created_by: user_id
                  }
                });

              case 3:
                return _context7.abrupt("return", _context7.sent);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function getGroupUserCreated(_x7) {
        return _getGroupUserCreated.apply(this, arguments);
      }

      return getGroupUserCreated;
    }()
  }, {
    key: "createMember",
    value: function () {
      var _createMember = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(data) {
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt("return", _models.User_Group.create(data));

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function createMember(_x8) {
        return _createMember.apply(this, arguments);
      }

      return createMember;
    }()
  }]);
  return GroupServices;
}();

exports["default"] = GroupServices;