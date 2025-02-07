import app from './app';
import { seedProducts } from './config/seed-products';
import { envs } from './config/env';

const startServer = async () => {
  try {
    app.listen(envs.PORT, () => {
      console.log(`Server running on port ${envs.PORT}`);
    });

    await seedProducts();
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
};

startServer();
