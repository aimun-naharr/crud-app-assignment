import TUser from './user.interface';
import User from './user.model';

const createUser = async (user: TUser) => {
  try {
    const newUser = new User(user);
    const result = await newUser.save();
    return result;
  } catch (error) {
    return error;
  }
};

export const userServices = {
  createUser,
};
