import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { productService } from '../services/product-service';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product, { IProduct } from '../models/product-model';

dotenv.config();

describe('Product Service', () => {
  const PRODUCT_ID = new mongoose.Types.ObjectId('60f0b2e9d1f5c7f1d0d3b5e2');
  const TEST_PRODUCT: Partial<IProduct> = {
    _id: PRODUCT_ID,
    name: 'Test Product',
    price: 100,
    description: 'A product for testing',
    category: 'Test Category',
    stock: 10,
    createdAt: new Date(),
  };

  beforeAll(async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI!);
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
    }
  });

  afterAll(async () => {
    await mongoose.connection.db?.dropDatabase();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Product.deleteMany({});
  });

  it('should get all products', async () => {
    await Product.create(TEST_PRODUCT);

    const products = await productService.getAllProducts();

    expect(products).toHaveLength(products.length);
    expect(products[0]).toHaveProperty('_id', PRODUCT_ID);
    expect(products[0]).toHaveProperty('name', 'Test Product');
  });

  it('should get a product by ID', async () => {
    await Product.create(TEST_PRODUCT);

    const product = await productService.getProduct({ _id: PRODUCT_ID });
    expect(product).not.toBeNull();
    expect(product!._id).toEqual(PRODUCT_ID);
    expect(product!.name).toBe('Test Product');
  });

  it('should return null for a non-existent product ID', async () => {
    const nonExistentId = new mongoose.Types.ObjectId(
      '60f0b2e9d1f5c7f1d0d3b5e3',
    );
    const product = await productService.getProduct({ _id: nonExistentId });
    expect(product).toBeNull();
  });
});
