"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userRoutes = _interopRequireDefault(require("./api/userRoutes"));

var _groupRoutes = _interopRequireDefault(require("./api/groupRoutes"));

var _adminRoutes = _interopRequireDefault(require("./api/adminRoutes"));

var _multer = _interopRequireDefault(require("../utils/multer.utils"));

var routes = _express["default"].Router();

routes.use('/users', _userRoutes["default"]);
routes.use('/groups', _groupRoutes["default"]);
routes.use('/admins', _adminRoutes["default"]);
var _default = routes;
exports["default"] = _default;