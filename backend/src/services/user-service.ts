import User, { IUser } from '../models/user-model';

const createUser = async (): Promise<IUser> => {
  const user = new User();
  return await user.save();
};

const getUsers = async (): Promise<IUser[]> => {
  return await User.find({});
};

export const userService = { createUser, getUsers };
