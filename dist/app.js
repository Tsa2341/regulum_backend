"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _routes = _interopRequireDefault(require("./routes"));

var _models = require("./database/models");

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

require("dotenv");

var app = (0, _express["default"])();
var port = parseInt(process.env.PORT) || 3000;

try {
  app.set('view engine', 'ejs');
  app.use(_express["default"].urlencoded({
    extended: true
  }));
  app.use(_express["default"].json());
  app.use((0, _cookieParser["default"])());
  app.use((0, _cors["default"])());
  app.use((0, _morgan["default"])('dev'));
  app.get('/', function (req, res, next) {
    res.status(200).json({
      message: 'hello, this is my api'
    });
  });
  app.use('/api/v1', _routes["default"]);
  app.use('*', function (req, res, next) {
    res.status(404).json({
      message: 'not found'
    });
  });
  app.listen(port, /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('app running on port ' + port);
            _context.next = 3;
            return _models.sequelize.authenticate().then(function (err) {
              if (err) return console.log('database connection failed');
              console.log('connected to the database');
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
} catch (error) {
  console.error(error);
}