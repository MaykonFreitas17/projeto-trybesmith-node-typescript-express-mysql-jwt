import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validationUser,
{ validationUsername,
  validationClasse,
  validationLevel,
  validationPassword,
} from '../middlewares/user.middleware';

const router = Router();

const userController = new UserController();

router.post('/login/', validationUser, userController.login);

router.use(validationUsername);
router.use(validationClasse);
router.use(validationLevel);
router.use(validationPassword);
router.post('/users', userController.create);

export default router;