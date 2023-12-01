import bcrypt from 'bcrypt';
import { config } from '../../config';
import TUser, { TUpdateUser } from './user.interface';
import User from './user.model';
import ErrorHandler from '../middleware/error';

const createUser = async (user: TUser) => {
  const newUser = new User(user);
  const isUserExits = await User.isUserExits(user.userId);
  if (isUserExits) {
    throw new ErrorHandler('User already exists', 404);
  }
  const result = await newUser.save();
  const { password, orders, ...rest } = result.toObject();
  return rest;
};
const getAllUsersFromDb = async () => {
  try {
    const allUsers = await User.find({}, { password: 0, orders: 0 });
    return allUsers;
  } catch (error) {
    return error;
  }
};

const getUserByIdFromDb = async (id: number) => {
  try {
    const user = await User.findOne({ userId: id }, { password: 0, orders: 0 });
    return user;
  } catch (error) {
    return error;
  }
};

const updateUserInDb = async (id: number, updatedInfo: TUpdateUser) => {
  const isUserExits = await User.isUserExits(Number(id));
  if (!isUserExits) {
    throw new Error('User not found');
  } else {
    if (updatedInfo.password) {
      updatedInfo.password = await bcrypt.hash(
        updatedInfo.password,
        Number(config.salt),
      );
    }
    const updatedDoc = await User.findOneAndUpdate(
      { userId: id },
      updatedInfo,
      {
        new: true,
        runValidators: true,
        select: '-password',
      },
    );
    return updatedDoc;
  }
};

const deleteUserfromDb = async (id: number) => {
  const isUserExits = await User.isUserExits(Number(id));
  if (!isUserExits) {
    throw new Error('User not found');
  }
  const result = User.deleteOne({ userId: id });
  return result;
};

export const userServices = {
  createUser,
  getAllUsersFromDb,
  getUserByIdFromDb,
  updateUserInDb,
  deleteUserfromDb,
};
