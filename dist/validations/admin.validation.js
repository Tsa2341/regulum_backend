"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = adminValidation;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _joi = _interopRequireDefault(require("joi"));

var _enum = require("../utils/enum.utils");

function adminValidation(req, res, next) {
  var adminValidation = _joi["default"].object({
    group_id: _joi["default"].string().uuid().required().empty(),
    user_id: _joi["default"].string().uuid().required().empty(),
    user_role: _joi["default"].valid.apply(_joi["default"], (0, _toConsumableArray2["default"])(_enum.userGroupRoles)).required().empty()
  });

  var valid = adminValidation.validate(req.body);
  if (valid.error) return res.status(406).json({
    message: valid.error.details[0].message.replace(/["'`]+/gi, '')
  });
  next();
}