import TUser from './user.interface';
import User from './user.model';

const createUser = async (user: TUser) => {
  try {
    const newUser = new User(user);
    const result = await newUser.save();
    const { password, orders, ...rest } = result.toObject();
    return rest;
  } catch (error) {
    return error;
  }
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

export const userServices = {
  createUser,
  getAllUsersFromDb,
  getUserByIdFromDb,
};
