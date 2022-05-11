import express from 'express';
import upload from '../../utils/multer.utils';
import UserControllers from '../../controllers/user.controller';
import { verifyEmailExist } from '../../middlewares/user.middleware';
import { registerValidation, updateValidation } from '../../validations/user.validation';
import authenticate from '../../middlewares/authenticate.middleware';
import { checkSuperAdmin } from '../../middlewares/checks.middleware';

const routes = express.Router();

const userControllers = new UserControllers();

routes.get('/', authenticate, checkSuperAdmin, userControllers.getAllUsers);
routes.get('/one', authenticate, userControllers.getUser);
routes.get('/verify/:email/:token', userControllers.verifyEmail);

routes.post(
	'/register',
	upload.single('image'),
	registerValidation,
	verifyEmailExist,
	userControllers.createUser,
);
routes.post('/login', registerValidation, userControllers.loginUser);
routes.post('/logout', authenticate, userControllers.logoutUser);

routes.patch('/', updateValidation, authenticate, userControllers.upateUser);

routes.delete('/', authenticate, userControllers.deleteUser);

export default routes;
