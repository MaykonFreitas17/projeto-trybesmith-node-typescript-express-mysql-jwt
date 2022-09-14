import express from 'express';
import productRoutes from './routes/product.routes';
import userRoutes from './routes/user.routes';
import orderRoutes from './routes/order.routes';

const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(orderRoutes);
app.use(productRoutes);

export default app;
