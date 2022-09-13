import express from 'express';
import productRoutes from './routes/product.routes';
import userRoutes from './routes/user.routes';

const app = express();

app.use(express.json());

app.use(productRoutes);
app.use(userRoutes);

export default app;
