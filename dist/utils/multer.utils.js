"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var storage = _multer["default"].diskStorage({
  limits: {
    files: 1,
    fileSize: 1024 * 1024
  },
  filename: function filename(req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  }
});

var fileFilter = function fileFilter(req, file, cb) {
  var ext = _path["default"].extname(file.originalname).toLowerCase();

  if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
    return cb(new Error('Only images are allowed'));
  }

  cb(null, true);
};

var upload = (0, _multer["default"])({
  fileFilter: fileFilter,
  storage: storage
});
var _default = upload;
exports["default"] = _default;