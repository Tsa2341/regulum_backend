"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require('../../utils/enum.utils'),
    accountTypes = _require.accountTypes;

module.exports = {
  up: function up(queryInterface, DataTypes) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.createTable('Groups', {
                id: {
                  allowNull: false,
                  primaryKey: true,
                  unique: true,
                  type: DataTypes.UUID,
                  defaultValue: DataTypes.UUIDV4
                },
                type: {
                  type: DataTypes.ENUM,
                  values: accountTypes,
                  defaultValue: 'managing',
                  allowNull: false
                },
                name: {
                  type: DataTypes.STRING,
                  unique: true,
                  allowNull: false
                },
                goal: {
                  type: DataTypes.TEXT('large')
                },
                description: {
                  type: DataTypes.TEXT('large')
                },
                created_by: {
                  type: DataTypes.UUID,
                  allowNullL: false
                },
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
              return queryInterface.dropTable('Groups');

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};