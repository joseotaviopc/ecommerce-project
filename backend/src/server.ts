import dotenv from 'dotenv';
import app from './app';
import { seedProducts } from './config/seed-products';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await seedProducts();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
};

startServer();
