import { Request, Response } from 'express';
import { userService } from '../services/user-service';

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = await userService.createUser();
    res.status(201).json({ userId: user._id });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};
