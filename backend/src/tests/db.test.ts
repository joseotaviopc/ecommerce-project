import mongoose from 'mongoose';
import connectDB from '../config/db';
import { envs } from '../config/env';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

describe('Database Connection', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('should connect to MongoDB successfully', async () => {
    const mongoUri = envs.MONGODB_URI;
    expect(mongoose.connection.readyState).toBe(1);
  });
});
