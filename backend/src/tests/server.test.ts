// src/tests/server.test.ts
import { describe, it, expect, vi } from 'vitest';
import app from '../app'; // Adjust the import path as necessary
import { seedProducts } from '../config/seed-products';
import { createServer } from 'http';

vi.mock('../config/seed-products', () => ({
  seedProducts: vi.fn(),
}));

describe('Server', () => {
  it('should start the server and call seedProducts', async () => {
    const PORT = 3000; // You can set this to your expected port
    const server = createServer(app);

    // Mock console.log to verify server start message
    const consoleLogMock = vi
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    // Start the server
    await new Promise<void>((resolve) => {
      server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        resolve();
      });
    });

    // Call the server's start function (assuming it's exported)
    await seedProducts();

    // Verify that the server is listening and the seedProducts function was called
    expect(seedProducts).toHaveBeenCalled();
    expect(consoleLogMock).toHaveBeenCalledWith(
      `Server running on port ${PORT}`,
    );

    // Clean up
    server.close();
  });
});
