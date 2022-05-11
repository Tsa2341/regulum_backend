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

var _crypto = _interopRequireDefault(require("crypto"));

var _user = require("../utils/user.util");

var UserServices = /*#__PURE__*/function () {
  function UserServices() {
    (0, _classCallCheck2["default"])(this, UserServices);
  }

  (0, _createClass2["default"])(UserServices, [{
    key: "getUser",
    value: function () {
      var _getUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _models.User.findOne({
                  where: data,
                  include: ['groups']
                });

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getUser(_x) {
        return _getUser.apply(this, arguments);
      }

      return getUser;
    }()
  }, {
    key: "checkUserIfMember",
    value: function () {
      var _checkUserIfMember = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _models.User_Group.findOne({
                  where: data
                });

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function checkUserIfMember(_x2) {
        return _checkUserIfMember.apply(this, arguments);
      }

      return checkUserIfMember;
    }()
  }, {
    key: "getAllUsers",
    value: function () {
      var _getAllUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _models.User.findAll({
                  include: ['groups']
                });

              case 2:
                return _context3.abrupt("return", _context3.sent);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getAllUsers() {
        return _getAllUsers.apply(this, arguments);
      }

      return getAllUsers;
    }()
  }, {
    key: "createUser",
    value: function () {
      var _createUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(data, res) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _models.User.create(data);

              case 3:
                return _context4.abrupt("return", res.status(201).json({
                  message: 'created user successfully'
                }));

              case 6:
                _context4.prev = 6;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", res.status(406).json({
                  message: _context4.t0.message || "user couldn't be created"
                }));

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 6]]);
      }));

      function createUser(_x3, _x4) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }()
  }, {
    key: "updateUser",
    value: function () {
      var _updateUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(data, id) {
        var updateUser, username, family_name, given_name, nationality, occupation, age;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _models.User.findOne({
                  id: id
                });

              case 2:
                updateUser = _context5.sent;
                username = data.username, family_name = data.family_name, given_name = data.given_name, nationality = data.nationality, occupation = data.occupation, age = data.age;
                updateUser.username = username || updateUser.username;
                updateUser.family_name = family_name || updateUser.family_name;
                updateUser.given_name = given_name || updateUser.given_name;
                updateUser.nationality = nationality || updateUser.nationality;
                updateUser.occupation = occupation || updateUser.occupation;
                updateUser.age = age || updateUser.age;
                _context5.next = 12;
                return updateUser.save();

              case 12:
                return _context5.abrupt("return", updateUser);

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function updateUser(_x5, _x6) {
        return _updateUser.apply(this, arguments);
      }

      return updateUser;
    }()
  }, {
    key: "deleteUser",
    value: function () {
      var _deleteUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_ref) {
        var email, id;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                email = _ref.email, id = _ref.id;
                return _context6.abrupt("return", _models.User.destroy({
                  where: {
                    email: email,
                    id: id
                  }
                }));

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function deleteUser(_x7) {
        return _deleteUser.apply(this, arguments);
      }

      return deleteUser;
    }()
  }, {
    key: "getMembers",
    value: function () {
      var _getMembers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(type, id) {
        var group;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _models.User.findAll({
                  include: [{
                    model: _models.Group,
                    as: 'groups',
                    where: {
                      id: id
                    },
                    required: true,
                    attributes: [],
                    through: {
                      model: _models.User_Group,
                      where: {
                        user_role: type
                      },
                      attributes: []
                    }
                  }]
                });

              case 2:
                group = _context7.sent;
                return _context7.abrupt("return", group);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function getMembers(_x8, _x9) {
        return _getMembers.apply(this, arguments);
      }

      return getMembers;
    }()
  }, {
    key: "addMembers",
    value: function () {
      var _addMembers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(data) {
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _models.User_Group.create(data);

              case 2:
                return _context8.abrupt("return", _context8.sent);

              case 3:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function addMembers(_x10) {
        return _addMembers.apply(this, arguments);
      }

      return addMembers;
    }()
  }, {
    key: "deleteMembers",
    value: function () {
      var _deleteMembers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(data) {
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return _models.User_Group.destroy({
                  where: data
                });

              case 2:
                return _context9.abrupt("return", _context9.sent);

              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function deleteMembers(_x11) {
        return _deleteMembers.apply(this, arguments);
      }

      return deleteMembers;
    }()
  }]);
  return UserServices;
}();

exports["default"] = UserServices;