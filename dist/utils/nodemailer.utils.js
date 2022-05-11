"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = main;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var nodemailer = require('nodemailer');

require('dotenv').config();

function main(_x, _x2, _x3, _x4) {
  return _main.apply(this, arguments);
}

function _main() {
  _main = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(receiver, subject, text, html) {
    var transporter, info;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
              }
            });
            _context.next = 3;
            return transporter.sendMail({
              sender: 'regulum',
              from: {
                name: 'regulum',
                address: process.env.EMAIL_USER
              },
              to: receiver,
              subject: subject,
              text: text,
              html: html
            });

          case 3:
            info = _context.sent;
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            return _context.abrupt("return", info);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _main.apply(this, arguments);
}