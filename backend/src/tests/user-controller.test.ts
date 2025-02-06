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
import { createUser, getUsers } from '../controllers/user-controller';
import { userService } from '../services/user-service';

dotenv.config();

const app = express();
app.use(express.json());
app.post('/users', createUser);
app.get('/users', getUsers);

describe('User Controller', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await mongoose.connection.db?.dropDatabase();
  });

  it('should create a new user', async () => {
    const mockCreateUser = vi
      .spyOn(userService, 'createUser')
      .mockResolvedValue({
        _id: new mongoose.Types.ObjectId('60f0b2e9d1f5c7f1d0d3b5e2'),
      });

    const response = await request(app).post('/users').send();

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('userId', '60f0b2e9d1f5c7f1d0d3b5e2');

    mockCreateUser.mockRestore();
  });

  it('should return an error if user creation fails', async () => {
    const mockCreateUser = vi
      .spyOn(userService, 'createUser')
      .mockRejectedValue(new Error('User creation error'));

    const response = await request(app).post('/users').send();

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'User creation error');

    mockCreateUser.mockRestore();
  });

  it('should get all users', async () => {
    const mockGetUsers = vi.spyOn(userService, 'getUsers').mockResolvedValue([
      {
        _id: new mongoose.Types.ObjectId('60f0b2e9d1f5c7f1d0d3b5e2'),
      },
    ]);

    const response = await request(app).get('/users').send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ _id: '60f0b2e9d1f5c7f1d0d3b5e2' }]);

    mockGetUsers.mockRestore();
  });

  it('should return an error if getting users fails', async () => {
    const mockGetUsers = vi
      .spyOn(userService, 'getUsers')
      .mockRejectedValue(new Error('Get users error'));

    const response = await request(app).get('/users').send();

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Get users error');

    mockGetUsers.mockRestore();
  });
});
