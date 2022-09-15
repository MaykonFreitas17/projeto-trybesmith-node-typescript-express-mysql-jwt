import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import validationToken from '../middlewares/token.middleware';

const router = Router();

const orderController = new OrderController();
router.get('/orders/', orderController.getAll);
router.post('/orders/', validationToken, orderController.create);

export default router;