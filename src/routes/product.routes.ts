import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import { validationName, validationAmount } from '../middlewares/product.middleware';

const router = Router();

const productController = new ProductController();

router.get('/products/', productController.getAll);

router.use(validationName);
router.use(validationAmount);
router.post('/products/', productController.create);

export default router;