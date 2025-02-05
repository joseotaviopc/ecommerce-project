import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import setupSwagger from './swagger';
import productRoutes from './routes/product-routes';
import cartRoutes from './routes/cart-routes';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({ message: 'API is running...' });
});
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

setupSwagger(app);

export default app;
