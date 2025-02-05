import { faker } from '@faker-js/faker';
import Product from '../models/product-model';
import dotenv from 'dotenv';

dotenv.config();

export const seedProducts = async () => {
  try {
    await Product.deleteMany({});

    const products = Array.from({ length: 50 }, () => ({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      stock: faker.number.int({ min: 0, max: 100 }),
      category: faker.commerce.department(),
      images: [faker.image.url(), faker.image.url()],
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await Product.insertMany(products);

    console.log('Products seeded successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};
