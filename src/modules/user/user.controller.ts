import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../middleware/error';
import { userServices } from './user.service';
import UserSchemaValidation, {
  UpdateUserSchemaValidation,
} from './user.validate';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const zodParsedUserData = UserSchemaValidation.parse(req.body);
    const result = await userServices.createUser(zodParsedUserData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, error.code));
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await userServices.getAllUsersFromDb();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: allUsers,
    });
  } catch (error) {
    res.json(error);
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await userServices.getUserByIdFromDb(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: user,
    });
  } catch (error) {
    res.json(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const zodParsedUserData = UpdateUserSchemaValidation.parse(req.body);
    const result = await userServices.updateUserInDb(
      Number(userId),
      zodParsedUserData,
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error) {
    res.json(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const result = await userServices.deleteUserfromDb(Number(userId));
    if (result.deletedCount === 1) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
