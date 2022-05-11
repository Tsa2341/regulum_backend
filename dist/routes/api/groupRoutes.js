"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _group = _interopRequireDefault(require("../../controllers/group.controller"));

var _group_admin = _interopRequireDefault(require("../../controllers/group_admin.controller"));

var _group_members = _interopRequireDefault(require("../../controllers/group_members.controller"));

var _authenticate = _interopRequireDefault(require("../../middlewares/authenticate.middleware"));

var _checks = require("../../middlewares/checks.middleware");

var _group2 = _interopRequireWildcard(require("../../validations/group.validation"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var routes = _express["default"].Router();

var groupControllers = new _group["default"]();
var groupMemberControllers = new _group_members["default"]();
var groupAdminControllers = new _group_admin["default"]();
routes.get('/', _authenticate["default"], _checks.checkSuperAdmin, groupControllers.getAllGroups);
routes.get('/user_groups', _authenticate["default"], groupControllers.getUserGroups);
routes.post('/create', _group2["default"], _authenticate["default"], groupControllers.createGroup);
routes.patch('/:id', _group2.updateGroupValidation, _authenticate["default"], groupControllers.updateGroup);
routes["delete"]('/:id', _authenticate["default"], groupControllers.deleteGroup);
routes.get('/:groupId/members/:type', _authenticate["default"], groupMemberControllers.getMembers);
routes.post('/:groupId/members', _group2.membersValidation, _authenticate["default"], groupMemberControllers.addMembers);
routes["delete"]('/:groupId/members', _group2.membersValidation, _authenticate["default"], groupMemberControllers.deleteMembers);
routes.get('/:groupId/admins', _authenticate["default"], groupAdminControllers.getAdmins);
routes.post('/:groupId/admins/:id', _authenticate["default"], groupAdminControllers.createAdmins);
routes["delete"]('/:groupId/admins/:id', _authenticate["default"], groupAdminControllers.deleteAdmins);
var _default = routes;
exports["default"] = _default;