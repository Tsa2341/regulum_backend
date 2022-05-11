"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateValidation = exports.registerValidation = void 0;

var _joi = _interopRequireDefault(require("joi"));

var registerValidation = function registerValidation(req, res, next) {
  var registerSchema = _joi["default"].object({
    email: _joi["default"].string().empty().required().email(),
    password: _joi["default"].string().empty().required().regex(/^(?=.*[0-9])(?=.*[A-Z])(\w){8,}$/).message({
      'string.pattern.base': 'Password must contain atleast one number, upper-case and longer than 8 characters'
    })
  });

  var isValid = registerSchema.validate(req.body);
  if (isValid.error) return res.status(400).json({
    message: isValid.error.message.replace(/["'`]/gi, '')
  });
  next();
};

exports.registerValidation = registerValidation;

var updateValidation = function updateValidation(req, res, next) {
  var updateSchema = _joi["default"].object({
    username: _joi["default"].string().empty(),
    family_name: _joi["default"].string().empty(),
    given_name: _joi["default"].string().empty(),
    nationality: _joi["default"].string().empty(),
    occupation: _joi["default"].string().empty(),
    age: _joi["default"].number().empty()
  });

  var isValid = updateSchema.validate(req.body);
  if (isValid.error) return res.status(400).json({
    message: isValid.error.message.replace(/["'`]/gi, '')
  });
  next();
};

exports.updateValidation = updateValidation;