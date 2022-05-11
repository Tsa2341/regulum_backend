"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _admin = _interopRequireDefault(require("../../controllers/admin.controller"));

var _authenticate = _interopRequireDefault(require("../../middlewares/authenticate.middleware"));

var _admin2 = _interopRequireDefault(require("../../validations/admin.validation"));

var routes = _express["default"].Router();

var adminControllers = new _admin["default"]();
routes.post('/', _admin2["default"], _authenticate["default"], adminControllers.createAdmin);
var _default = routes;
exports["default"] = _default;