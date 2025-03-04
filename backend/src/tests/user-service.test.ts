import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { userService } from '../services/user-service';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { envs } from '../config/env';

dotenv.config();

describe('User Service', () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(envs.MONGODB_URI!);
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
    }
  });

  afterAll(async () => {
    await mongoose.connection.db?.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create a new user', async () => {
    const user = await userService.createUser();
    expect(user).toHaveProperty('_id');
  });
});
