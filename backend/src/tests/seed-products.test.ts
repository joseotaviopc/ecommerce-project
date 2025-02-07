import { describe, it, expect, vi, beforeEach } from 'vitest';
import { seedProducts } from '../config/seed-products';
import Product from '../models/product-model';
import User from '../models/user-model';
import Cart from '../models/cart-model';

vi.mock('../models/product-model', () => ({
  default: {
    deleteMany: vi.fn(),
    insertMany: vi.fn(),
  },
}));

vi.mock('../models/user-model', () => ({
  default: {
    deleteMany: vi.fn(),
  },
}));

vi.mock('../models/cart-model', () => ({
  default: {
    deleteMany: vi.fn(),
  },
}));

const consoleLogMock = vi.spyOn(console, 'log').mockImplementation(() => {});
const consoleErrorMock = vi
  .spyOn(console, 'error')
  .mockImplementation(() => {});

type ProcessWithExit = {
  exit: (code?: number | undefined) => null;
};
vi.spyOn(process as ProcessWithExit, 'exit').mockImplementation(() => null);

describe('seedProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should seed products successfully', async () => {
    await seedProducts();

    expect(Product.deleteMany).toHaveBeenCalledWith({});
    expect(User.deleteMany).toHaveBeenCalledWith({});
    expect(Cart.deleteMany).toHaveBeenCalledWith({});

    expect(Product.insertMany).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          description: expect.any(String),
          price: expect.any(Number),
          stock: expect.any(Number),
          category: expect.any(String),
          images: expect.arrayContaining([expect.any(String)]),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ]),
    );

    expect(consoleLogMock).toHaveBeenCalledWith('Products seeded successfully');
  });

  it('should handle errors during seeding', async () => {
    const mockError = new Error('Database error');

    try {
      await seedProducts();
    } catch (error) {
      expect(consoleErrorMock).toHaveBeenCalledWith(
        'Error seeding products:',
        mockError,
      );

      expect(process.exit).toHaveBeenCalledWith(1);
    }
  });
});
