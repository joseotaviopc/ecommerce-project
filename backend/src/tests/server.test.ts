import { describe, it, expect, vi } from 'vitest';
import app from '../app';
import { seedProducts } from '../config/seed-products';
import { createServer } from 'http';

vi.mock('../config/seed-products', () => ({
  seedProducts: vi.fn(),
}));

describe('Server', () => {
  it('should start the server and call seedProducts', async () => {
    const PORT = 3000;
    const server = createServer(app);

    const consoleLogMock = vi
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    await new Promise<void>((resolve) => {
      server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        resolve();
      });
    });

    await seedProducts();

    expect(seedProducts).toHaveBeenCalled();
    expect(consoleLogMock).toHaveBeenCalledWith(
      `Server running on port ${PORT}`,
    );

    server.close();
  });
});
