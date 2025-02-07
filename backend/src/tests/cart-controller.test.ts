import { Request, Response } from 'express';
import mongoose from 'mongoose';
import {
  createCart,
  editCart,
  removeItemFromCart,
} from '../controllers/cart-controller';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock the cartService and productService to prevent actual async operations
vi.mock('../services/cart-services', () => ({
  cartService: {
    createCart: vi
      .fn()
      .mockResolvedValue({ cartId: 'fakeCartId', products: [] }),
    editCart: vi.fn().mockResolvedValue({ success: true }),
    removeItemFromCart: vi.fn().mockResolvedValue({ success: true }),
  },
}));

vi.mock('../services/product-service', () => ({
  productService: {
    getProduct: vi
      .fn()
      .mockResolvedValue({ _id: 'fakeProductId', name: 'Fake Product' }),
  },
}));

describe('Cart Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
  });

  test('createCart returns cart and responds with json', async () => {
    await createCart(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith({
      cartId: 'fakeCartId',
      products: [],
    });
  });

  test('editCart returns 400 for missing parameters', async () => {
    req = {
      params: {},
      body: {},
    };

    await editCart(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing parameters' });
  });

  test('removeItemFromCart returns 400 for missing parameters', async () => {
    req = {
      params: {},
      body: {},
    };

    await removeItemFromCart(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing parameters' });
  });

  test('editCart invokes cartService.editCart if product exists', async () => {
    req = {
      params: { id: new mongoose.Types.ObjectId().toHexString() },
      body: {
        productId: new mongoose.Types.ObjectId().toHexString(),
        quantity: 2,
        price: 10,
      },
    };

    await editCart(req as Request, res as Response);

    // Check that the service was called and proper response was given
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ success: true });
  });
});
