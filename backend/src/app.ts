import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import setupSwagger from './swagger';
import productRoutes from './routes/product-routes';
import cartRoutes from './routes/cart-routes';
import statusRoute from './routes/status-route';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/status', statusRoute);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

setupSwagger(app);

export default app;
