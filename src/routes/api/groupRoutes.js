import express from 'express';
import GroupControllers from '../../controllers/group.controller';
import GroupAdminControllers from '../../controllers/group_admin.controller';
import GroupMemberControllers from '../../controllers/group_members.controller';
import authenticate from '../../middlewares/authenticate.middleware';
import {
	CheckGroup,
	checkSuperAdmin,
} from '../../middlewares/checks.middleware';
import groupValidation, {
	updateGroupValidation,
	membersValidation,
} from '../../validations/group.validation';

const routes = express.Router();
const groupControllers = new GroupControllers();
const groupMemberControllers = new GroupMemberControllers();
const groupAdminControllers = new GroupAdminControllers();

routes.get('/', authenticate, checkSuperAdmin, groupControllers.getAllGroups);
routes.get('/user_groups', authenticate, groupControllers.getUserGroups);

routes.post(
	'/create',
	groupValidation,
	authenticate,
	groupControllers.createGroup,
);

routes.patch(
	'/:id',
	updateGroupValidation,
	authenticate,
	groupControllers.updateGroup,
);

routes.delete('/:id', authenticate, groupControllers.deleteGroup);

routes.get(
	'/:groupId/members/:type',
	authenticate,
	groupMemberControllers.getMembers,
);
routes.post(
	'/:groupId/members',
	membersValidation,
	authenticate,
	new CheckGroup.type(),
	groupMemberControllers.addMembers,
);
routes.delete(
	'/:groupId/members',
	membersValidation,
	authenticate,
	checkGroup,
	groupMemberControllers.deleteMembers,
);

routes.get('/:groupId/admins', authenticate, groupAdminControllers.getAdmins);
routes.post(
	'/:groupId/admins/:id',
	authenticate,
	checkGroup,
	groupAdminControllers.createAdmins,
);
routes.delete(
	'/:groupId/admins/:id',
	authenticate,
	checkGroup,
	groupAdminControllers.deleteAdmins,
);

export default routes;
