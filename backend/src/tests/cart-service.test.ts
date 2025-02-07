import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { cartService } from '../services/cart-services';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/product-model';
import { envs } from '../config/env';

dotenv.config();

describe('Cart Service', () => {
  const USER_ID = new mongoose.Types.ObjectId('60f0b2e9d1f5c7f1d0d3b5e2');
  const PRODUCT_ID = new mongoose.Types.ObjectId('60f0b2e9d1f5c7f1d0d3b5e3');

  beforeAll(async () => {
    try {
      await mongoose.connect(envs.MONGODB_URI!);
      await Product.create({
        _id: PRODUCT_ID,
        name: 'product name',
        description: 'product description',
        price: 20,
        stock: 50,
        category: 'categoria',
        images: ['imagem01'],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
    }
  });

  afterAll(async () => {
    await mongoose.connection.db?.dropDatabase();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await mongoose.connection.db?.dropDatabase();
  });

  it('should create a new cart', async () => {
    const cart = await cartService.createCart();
    expect(cart).toHaveProperty('_id');
    expect(cart.userId.toString()).toBe(USER_ID.toString());
    expect(cart.items).toEqual([]);
  });

  it('should edit an existing cart', async () => {
    await cartService.createCart();

    const updatedCart = await cartService.editCart({
      userId: USER_ID,
      productId: PRODUCT_ID,
      quantity: 2,
      price: 50,
    });

    expect(updatedCart).not.toBeNull();
    expect(updatedCart!.items).toHaveLength(1);
    expect(updatedCart!.items[0].productId.toString()).toBe(
      PRODUCT_ID.toString(),
    );
    expect(updatedCart!.items[0].quantity).toBe(2);
    expect(updatedCart!.items[0].price).toBe(50);
  });

  it('should add a new item to the cart', async () => {
    await cartService.createCart();

    const updatedCart = await cartService.editCart({
      productId: PRODUCT_ID,
      userId: USER_ID,
      quantity: 2,
      price: 50,
    });

    const newProductId = new mongoose.Types.ObjectId(
      '60f0b2e9d1f5c7f1d0d3b5e4',
    );
    const furtherUpdatedCart = await cartService.editCart({
      userId: USER_ID,
      productId: newProductId,
      quantity: 3,
      price: 75,
    });

    expect(furtherUpdatedCart).not.toBeNull();
    expect(furtherUpdatedCart!.items).toHaveLength(2);
    expect(furtherUpdatedCart!.items[1].productId.toString()).toBe(
      newProductId.toString(),
    );
    expect(furtherUpdatedCart!.items[1].quantity).toBe(3);
    expect(furtherUpdatedCart!.items[1].price).toBe(75);
  });

  it('should remove an item from the cart', async () => {
    await cartService.createCart();

    await cartService.editCart({
      userId: USER_ID,
      productId: PRODUCT_ID,
      quantity: 2,
      price: 50,
    });

    const updatedCart = await cartService.removeItemFromCart({
      userId: USER_ID,
      productId: PRODUCT_ID,
    });

    expect(updatedCart).not.toBeNull();
    expect(updatedCart!.items).toHaveLength(0);
  });
});
