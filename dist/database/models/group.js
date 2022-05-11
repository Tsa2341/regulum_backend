"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var _require = require('sequelize'),
    Model = _require.Model;

var _require2 = require('../../utils/enum.utils'),
    accountTypes = _require2.accountTypes;

module.exports = function (sequelize, DataTypes) {
  var Group = /*#__PURE__*/function (_Model) {
    (0, _inherits2["default"])(Group, _Model);

    var _super = _createSuper(Group);

    function Group() {
      (0, _classCallCheck2["default"])(this, Group);
      return _super.apply(this, arguments);
    }

    (0, _createClass2["default"])(Group, [{
      key: "toJSON",
      value: function toJSON() {
        return _objectSpread(_objectSpread({}, this.get()), {}, {
          id: undefined
        });
      }
    }], [{
      key: "associate",
      value:
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      function associate(_ref) {
        var User = _ref.User,
            User_Group = _ref.User_Group;
        // define association here
        this.belongsToMany(User, {
          through: User_Group,
          as: 'users',
          foreignKey: 'group_id'
        });
      }
    }]);
    return Group;
  }(Model);

  Group.init({
    id: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true,
      allowNull: false,
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
    goal: DataTypes.TEXT('large'),
    description: DataTypes.TEXT('large'),
    created_by: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize: sequelize,
    modelName: 'Group'
  });
  return Group;
};