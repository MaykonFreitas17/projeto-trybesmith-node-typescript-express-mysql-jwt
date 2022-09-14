import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validationUser from '../middlewares/user.middleware';

const router = Router();

const userController = new UserController();

router.post('/users', userController.create);
router.post('/login/', validationUser, userController.login);

export default router;