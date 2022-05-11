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

var _crypto = _interopRequireDefault(require("crypto"));

var _emailSender = _interopRequireDefault(require("../utils/emailSender"));

var _passwordSecurity = require("../utils/passwordSecurity");

var _user2 = require("../utils/user.util");

var _random = _interopRequireDefault(require("../services/random.services"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _nodemailer = _interopRequireDefault(require("../utils/nodemailer.utils"));

var _email = require("../utils/email.utils");

var UserControllers = /*#__PURE__*/function () {
  function UserControllers() {
    (0, _classCallCheck2["default"])(this, UserControllers);
    this.userServices = new _user["default"]();
    this.randomServices = new _random["default"]();
  } // get all users


  (0, _createClass2["default"])(UserControllers, [{
    key: "getAllUsers",
    value: function () {
      var _getAllUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var reqUsers;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return new _user["default"]().getAllUsers();

              case 3:
                reqUsers = _context.sent;
                res.status(200).json({
                  message: 'Retieved all users successfully',
                  data: reqUsers
                });
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                res.status(500).json({
                  message: _context.t0.message || 'An unexpected error occurred'
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function getAllUsers(_x, _x2) {
        return _getAllUsers.apply(this, arguments);
      }

      return getAllUsers;
    }() // get one User

  }, {
    key: "getUser",
    value: function () {
      var _getUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var _req$user, id, email, reqUser;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$user = req.user, id = _req$user.id, email = _req$user.email;
                _context2.next = 4;
                return new _user["default"]().getUser({
                  id: id,
                  email: email
                });

              case 4:
                reqUser = _context2.sent;
                return _context2.abrupt("return", res.status(200).json({
                  message: 'retrieved user successfully',
                  data: reqUser
                }));

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                res.status(500).json({
                  message: _context2.t0.message || 'An unexpected error occurred'
                });

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8]]);
      }));

      function getUser(_x3, _x4) {
        return _getUser.apply(this, arguments);
      }

      return getUser;
    }() // create user method

  }, {
    key: "createUser",
    value: function () {
      var _createUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
        var _req$body, password, email, response, token;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _req$body = req.body, password = _req$body.password, email = _req$body.email;

                if (!req.file) {
                  _context3.next = 8;
                  break;
                }

                console.log(req.file);
                _context3.next = 6;
                return _cloudinary["default"].v2.uploader.upload(req.file.path, {
                  folder: 'regulum'
                });

              case 6:
                response = _context3.sent;
                req.body['profile_image'] = response.url;

              case 8:
                token = _crypto["default"].randomBytes(32).toString('hex');
                _context3.next = 11;
                return (0, _nodemailer["default"])(req.body.email, 'Verify email', 'Verify email your email to continue', (0, _email.emailTemplate)("".concat(process.env.BASE_URL, "/api/v1/users/verify/").concat(email, "/").concat(token)));

              case 11:
                req.body.password = (0, _passwordSecurity.hashPassword)(password);
                req.body.token = token;
                _context3.next = 15;
                return new _user["default"]().createUser(req.body, res);

              case 15:
                _context3.next = 20;
                break;

              case 17:
                _context3.prev = 17;
                _context3.t0 = _context3["catch"](0);
                res.status(500).json({
                  message: _context3.t0.message || 'An unexpected error occurred'
                });

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 17]]);
      }));

      function createUser(_x5, _x6, _x7) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }() // login user method

  }, {
    key: "loginUser",
    value: function () {
      var _loginUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
        var _req$body2, email, password, validUser, passMatch, token;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                _context4.next = 3;
                return new _user["default"]().getUser({
                  email: email
                }, res);

              case 3:
                validUser = _context4.sent;
                passMatch = validUser && (0, _passwordSecurity.verifyPassword)(password, validUser.password);

                if (!(!validUser || !passMatch)) {
                  _context4.next = 9;
                  break;
                }

                return _context4.abrupt("return", res.status(401).json({
                  message: "Invalid credentials"
                }));

              case 9:
                if (validUser.valid) {
                  _context4.next = 13;
                  break;
                }

                return _context4.abrupt("return", res.status(412).json({
                  message: "Email not verified, please use the link sent to your email if not reregister the account"
                }));

              case 13:
                _context4.next = 15;
                return (0, _user2.generateToken)(email, validUser.id);

              case 15:
                token = _context4.sent;
                return _context4.abrupt("return", res.status(200).cookie('token', token, {
                  httpOnly: true,
                  sameSite: 'lax'
                }).json({
                  message: 'User logged in successfully',
                  token: token
                }));

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function loginUser(_x8, _x9, _x10) {
        return _loginUser.apply(this, arguments);
      }

      return loginUser;
    }() // logout user method

  }, {
    key: "logoutUser",
    value: function () {
      var _logoutUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var token, list, nowDate, i, _token, tokenDate;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                // const token = req.headers.authorization.split(' ')[1];
                token = req.cookies.token;
                _context5.next = 4;
                return new _random["default"]().saveWhitelistToken(token);

              case 4:
                _context5.next = 6;
                return new _random["default"]().getWhitelistToken();

              case 6:
                list = _context5.sent;
                nowDate = new Date().getTime();
                i = 0;

              case 9:
                if (!(i < list.length)) {
                  _context5.next = 20;
                  break;
                }

                _context5.next = 12;
                return (0, _user2.verifyToken)(list[i].value);

              case 12:
                _token = _context5.sent;
                tokenDate = new Date(_token.exp).getTime();

                if (!(tokenDate < nowDate)) {
                  _context5.next = 17;
                  break;
                }

                _context5.next = 17;
                return list[i].destroy();

              case 17:
                i++;
                _context5.next = 9;
                break;

              case 20:
                return _context5.abrupt("return", res.status(200).clearCookie('token').json({
                  message: 'User logged out successfully'
                }));

              case 23:
                _context5.prev = 23;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", res.status(500).json({
                  message: 'An unexpected error occured',
                  error: _context5.t0.message && _context5.t0.message.replace(/[`'"]+/gi, '')
                }));

              case 26:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 23]]);
      }));

      function logoutUser(_x11, _x12) {
        return _logoutUser.apply(this, arguments);
      }

      return logoutUser;
    }() // verify email and make it a valid email

  }, {
    key: "verifyEmail",
    value: function () {
      var _verifyEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var _req$params, email, token, userInVerif;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _req$params = req.params, email = _req$params.email, token = _req$params.token;
                _context6.next = 3;
                return new _user["default"]().getUser({
                  email: email
                });

              case 3:
                userInVerif = _context6.sent;

                if (!(userInVerif === null)) {
                  _context6.next = 6;
                  break;
                }

                return _context6.abrupt("return", res.status(406).render('emailVerif', {
                  text: 'Email verification failed, Please reregister to restart the proccess'
                }));

              case 6:
                if (!(userInVerif.valid === true)) {
                  _context6.next = 8;
                  break;
                }

                return _context6.abrupt("return", res.status(200).render('emailVerif', {
                  text: 'You are already verified, Return to the app'
                }));

              case 8:
                if (!(userInVerif.token !== token)) {
                  _context6.next = 10;
                  break;
                }

                return _context6.abrupt("return", res.status(400).render('emailVerif', {
                  text: 'Invalid token, Use the sent token in the link in your email'
                }));

              case 10:
                userInVerif.valid = true;
                userInVerif.token = null;
                _context6.next = 14;
                return userInVerif.save();

              case 14:
                res.status(200).render('emailVerif', {
                  text: 'Email verification was successful, Return to the app'
                });

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function verifyEmail(_x13, _x14) {
        return _verifyEmail.apply(this, arguments);
      }

      return verifyEmail;
    }() // Update user data

  }, {
    key: "upateUser",
    value: function () {
      var _upateUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
        var updatedUser;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return new _user["default"]().updateUser(req.body, req.user.id);

              case 3:
                updatedUser = _context7.sent;
                return _context7.abrupt("return", res.status(200).json({
                  message: 'Updated user successfully',
                  data: updatedUser
                }));

              case 7:
                _context7.prev = 7;
                _context7.t0 = _context7["catch"](0);
                res.status(500).json({
                  message: _context7.t0.message || 'An unexpected error occurred'
                });

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 7]]);
      }));

      function upateUser(_x15, _x16) {
        return _upateUser.apply(this, arguments);
      }

      return upateUser;
    }() // Delete one users

  }, {
    key: "deleteUser",
    value: function () {
      var _deleteUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
        var _req$user2, email, id, logout;

        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _req$user2 = req.user, email = _req$user2.email, id = _req$user2.id;
                _context8.next = 4;
                return new _user["default"]().deleteUser({
                  email: email,
                  id: id
                });

              case 4:
                logout = new UserControllers();
                _context8.next = 7;
                return logout.logoutUser(req, res);

              case 7:
                _context8.next = 12;
                break;

              case 9:
                _context8.prev = 9;
                _context8.t0 = _context8["catch"](0);
                res.status(500).json({
                  message: _context8.t0.message || 'An unexpected error occurred'
                });

              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 9]]);
      }));

      function deleteUser(_x17, _x18) {
        return _deleteUser.apply(this, arguments);
      }

      return deleteUser;
    }()
  }]);
  return UserControllers;
}();

exports["default"] = UserControllers;