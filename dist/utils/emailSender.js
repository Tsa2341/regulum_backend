"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = sendEmail;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("dotenv");

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

_mail["default"].setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(_x, _x2, _x3) {
  return _sendEmail.apply(this, arguments);
}

function _sendEmail() {
  _sendEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(senderEmail, subject, Url) {
    var msg, res;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            msg = {
              to: senderEmail,
              // Change to your recipient
              from: {
                name: 'Regulum',
                email: 'tsa2341@gmail.com'
              },
              // Change to your verified sender
              subject: subject,
              templateId: 'd-5ee49f6fbe2c48c6a415ef6ad6913c1b',
              dynamic_template_data: {
                Url: Url,
                Sender_Name: 'regulum',
                Sender_Address: 'Kigali/Gasabo',
                Sender_City: 'Kigali',
                Sender_State: 'Kigali',
                Sender_Zip: 403
              }
            };
            _context.next = 4;
            return _mail["default"].send(msg);

          case 4:
            res = _context.sent;
            console.log(res);
            return _context.abrupt("return", res);

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            throw "couldn't send the verification email";

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));
  return _sendEmail.apply(this, arguments);
}