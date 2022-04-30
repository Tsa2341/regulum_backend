import express from 'express';
import AdminControllers from '../../controllers/admin.controller';
import authenticate from '../../middlewares/authenticate.middleware';
import adminValidation from '../../validations/admin.validation';

const routes = express.Router();

const adminControllers = new AdminControllers();

routes.post('/', adminValidation, authenticate, adminControllers.createAdmin);

export default routes;
