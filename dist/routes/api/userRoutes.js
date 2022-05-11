"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("../../utils/multer.utils"));

var _user = _interopRequireDefault(require("../../controllers/user.controller"));

var _user2 = require("../../middlewares/user.middleware");

var _user3 = require("../../validations/user.validation");

var _authenticate = _interopRequireDefault(require("../../middlewares/authenticate.middleware"));

var _checks = require("../../middlewares/checks.middleware");

var routes = _express["default"].Router();

var userControllers = new _user["default"]();
routes.get('/', _authenticate["default"], _checks.checkSuperAdmin, userControllers.getAllUsers);
routes.get('/one', _authenticate["default"], userControllers.getUser);
routes.get('/verify/:email/:token', userControllers.verifyEmail);
routes.post('/register', _multer["default"].single('image'), _user3.registerValidation, _user2.verifyEmailExist, userControllers.createUser);
routes.post('/login', _user3.registerValidation, userControllers.loginUser);
routes.post('/logout', _authenticate["default"], userControllers.logoutUser);
routes.patch('/', _user3.updateValidation, _authenticate["default"], userControllers.upateUser);
routes["delete"]('/', _authenticate["default"], userControllers.deleteUser);
var _default = routes;
exports["default"] = _default;