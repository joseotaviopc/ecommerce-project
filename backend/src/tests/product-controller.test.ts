import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { getAllProducts, getProduct } from '../controllers/product-controller';
import { productService } from '../services/product-service';
import Product from '../models/product-model';
import { envs } from '../config/env';

dotenv.config();

const app = express();
app.use(express.json());
app.get('/products/all', getAllProducts);
app.get('/products/:id', getProduct);

describe('Product Controller', () => {
  beforeAll(async () => {
    await mongoose.connect(envs.MONGODB_URI!);
  });

  afterAll(async () => {
    await Product.deleteMany({});
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await mongoose.connection.db?.dropDatabase();
  });

  it('should get all products', async () => {
    const mockGetAllProducts = vi
      .spyOn(productService, 'getAllProducts')
      .mockResolvedValue([
        {
          _id: new mongoose.Types.ObjectId('60f0b2e9d1f5c7f1d0d3b5e2'),
          name: 'Product 1',
          price: 100,
        },
      ]);

    const response = await request(app).get('/products/all').send();

    expect(response.body).toEqual([
      { _id: '60f0b2e9d1f5c7f1d0d3b5e2', name: 'Product 1', price: 100 },
    ]);
    expect(response.status).toBe(200);

    mockGetAllProducts.mockRestore();
  });

  it('should return an error if getting all products fails', async () => {
    const mockGetAllProducts = vi
      .spyOn(productService, 'getAllProducts')
      .mockRejectedValue(new Error('Get all products error'));

    const response = await request(app).get('/products/all').send();

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Get all products error');

    mockGetAllProducts.mockRestore();
  });

  it('should get a product by ID', async () => {
    const mockGetProduct = vi
      .spyOn(productService, 'getProduct')
      .mockResolvedValue({
        _id: new mongoose.Types.ObjectId('60f0b2e9d1f5c7f1d0d3b5e2'),
        name: 'Product 1',
        price: 100,
      });

    const response = await request(app)
      .get('/products/60f0b2e9d1f5c7f1d0d3b5e2')
      .send();

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      _id: '60f0b2e9d1f5c7f1d0d3b5e2',
      name: 'Product 1',
      price: 100,
    });

    mockGetProduct.mockRestore();
  });

  it('should return a 400 error if product ID is missing', async () => {
    const response = await request(app).get('/products/invalid-id').send();

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      'error',
      'Missing or invalid parameters',
    );
  });

  it('should return an error if getting a product by ID fails', async () => {
    const mockGetProduct = vi
      .spyOn(productService, 'getProduct')
      .mockRejectedValue(new Error('Get product error'));

    const response = await request(app)
      .get('/products/60f0b2e9d1f5c7f1d0d3b5e2')
      .send();

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Get product error');

    mockGetProduct.mockRestore();
  });
});
