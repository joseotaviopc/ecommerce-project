import { describe, expect, test } from 'vitest';
import { envs } from '../config/env';

describe('Environment Variables', () => {
  test('should have MONGODB_URI defined', () => {
    expect(envs.MONGODB_URI).toBeDefined();
    expect(envs.MONGODB_URI).toMatch(/^mongodb:\/\/.+/);
  });

  test('should have PORT defined', () => {
    expect(envs.PORT).toBeDefined();
    expect(Number(envs.PORT)).toBeGreaterThan(0);
  });
});
