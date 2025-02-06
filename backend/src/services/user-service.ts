import User, { IUser } from '../models/user-model';

const createUser = async (): Promise<Pick<IUser, '_id'>> => {
  const user = new User();
  return await user.save();
};

const getUsers = async (): Promise<Pick<IUser, '_id'>[]> => {
  return await User.find({});
};

export const userService = { createUser, getUsers };
