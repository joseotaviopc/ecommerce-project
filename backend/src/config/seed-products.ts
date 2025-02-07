import { fakerPT_BR as faker } from '@faker-js/faker';
import Product from '../models/product-model';
import User from '../models/user-model';
import Cart from '../models/cart-model';
import dotenv from 'dotenv';

dotenv.config();

export const seedProducts = async () => {
  try {
    await Product.deleteMany({});
    await User.deleteMany({});
    await Cart.deleteMany({});

    const products = Array.from({ length: 20 }, () => ({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      stock: faker.number.int({ min: 0, max: 100 }),
      category: faker.commerce.department(),
      images: [
        faker.image.urlPicsumPhotos({
          height: 300,
          width: 300,
          grayscale: false,
          blur: 0,
        }),
        faker.image.urlLoremFlickr({ width: 300, height: 300 }),
      ],
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
