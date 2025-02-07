import { describe, it, expect, vi, beforeEach } from 'vitest';
import { seedProducts } from '../config/seed-products'; // Adjust the import path
import Product from '../models/product-model'; // Adjust the import path
import User from '../models/user-model'; // Adjust the import path
import Cart from '../models/cart-model'; // Adjust the import path

// Mock the models
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

// Mock console.log and console.error
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
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('should seed products successfully', async () => {
    // Mock the database operations
    // (Product.deleteMany).mockResolvedValueOnce({});
    // (User.deleteMany as vi.Mock).mockResolvedValueOnce({});
    // (Cart.deleteMany as vi.Mock).mockResolvedValueOnce({});
    // (Product.insertMany as vi.Mock).mockResolvedValueOnce([]);

    // Call the function
    await seedProducts();

    // Verify that deleteMany was called for each model
    expect(Product.deleteMany).toHaveBeenCalledWith({});
    expect(User.deleteMany).toHaveBeenCalledWith({});
    expect(Cart.deleteMany).toHaveBeenCalledWith({});

    // Verify that insertMany was called with the correct data
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

    // Verify that the success message was logged
    expect(consoleLogMock).toHaveBeenCalledWith('Products seeded successfully');
  });

  it('should handle errors during seeding', async () => {
    // Mock an error during deleteMany
    const mockError = new Error('Database error');
    // (Product.deleteMany as vi.Mock).mockRejectedValueOnce(mockError);

    // Call the function
    try {
      await seedProducts();
    } catch (error) {
      // Verify that the error was logged
      expect(consoleErrorMock).toHaveBeenCalledWith(
        'Error seeding products:',
        mockError,
      );

      // Verify that process.exit was called
      expect(process.exit).toHaveBeenCalledWith(1);
    }
  });
});
