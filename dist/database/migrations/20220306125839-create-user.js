'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function up(queryInterface, DataTypes) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.createTable('Users', {
                id: {
                  allowNull: false,
                  primaryKey: true,
                  unique: true,
                  type: DataTypes.UUID,
                  defaultValue: DataTypes.UUIDV4
                },
                email: {
                  type: DataTypes.STRING,
                  allowNull: false,
                  unique: true
                },
                password: {
                  type: DataTypes.STRING,
                  allowNull: false
                },
                username: {
                  type: DataTypes.STRING
                },
                family_name: {
                  type: DataTypes.STRING
                },
                given_name: {
                  type: DataTypes.STRING
                },
                nationality: {
                  type: DataTypes.STRING
                },
                occupation: {
                  type: DataTypes.STRING
                },
                age: {
                  type: DataTypes.INTEGER
                },
                profile_image: {
                  type: DataTypes.STRING,
                  defaultValue: 'https://res.cloudinary.com/demo/image/upload/v1570979139/eneivicys42bq5f2jpn2.jpg'
                },
                valid: {
                  type: DataTypes.BOOLEAN,
                  defaultValue: false
                },
                token: DataTypes.STRING,
                createdAt: {
                  allowNull: false,
                  type: DataTypes.DATE
                },
                updatedAt: {
                  allowNull: false,
                  type: DataTypes.DATE
                }
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  down: function down(queryInterface, DataTypes) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return queryInterface.dropTable('Users');

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};