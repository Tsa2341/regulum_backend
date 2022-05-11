import express from 'express';

import userRoutes from './api/userRoutes';
import groupRoutes from './api/groupRoutes';
import adminRoutes from './api/adminRoutes';
import multerUtils from '../utils/multer.utils';

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/groups', groupRoutes);
routes.use('/admins', adminRoutes);

export default routes;
