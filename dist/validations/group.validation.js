"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = groupValidation;
exports.membersValidation = membersValidation;
exports.updateGroupValidation = updateGroupValidation;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _joi = _interopRequireDefault(require("joi"));

var _enum = require("../utils/enum.utils");

function groupValidation(req, res, next) {
  var groupValidation = _joi["default"].object({
    type: _joi["default"].valid.apply(_joi["default"], (0, _toConsumableArray2["default"])(_enum.accountTypes)).required().empty(),
    name: _joi["default"].string().required().empty(),
    goal: _joi["default"].string().empty(),
    description: _joi["default"].string().empty()
  });

  var valid = groupValidation.validate(req.body);
  if (valid.error) return res.status(406).json({
    message: valid.error.details[0].message.replace(/["'`]+/gi, '')
  });
  next();
}

function updateGroupValidation(req, res, next) {
  var updateGroupValidation = _joi["default"].object({
    goal: _joi["default"].string().empty(),
    description: _joi["default"].string().empty()
  });

  var valid = updateGroupValidation.validate(req.body);
  if (valid.error) return res.status(406).json({
    message: valid.error.details[0].message.replace(/["'`]+/gi, '')
  });
  next();
}

function membersValidation(req, res, next) {
  var membersValidation = _joi["default"].object({
    user_ids: _joi["default"].array().items(_joi["default"].string().uuid()).empty().required()
  });

  var valid = membersValidation.validate(req.body);
  if (valid.error) return res.status(406).json({
    message: valid.error.details[0].message.replace(/["'`]+/gi, '')
  });
  next();
}