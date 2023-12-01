import { Request, Response } from 'express';
import { userServices } from './user.service';
import UserSchemaValidation from './user.validate';

const createUser = async (req: Request, res: Response) => {
  try {
    const zodParsedUserData = UserSchemaValidation.parse(req.body);
    const result = await userServices.createUser(zodParsedUserData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    console.log('user error', error);
    res.json(error);
  }
};

const getAllUsers = async (req: Request, res: Response) => {};

export const UserController = {
  createUser,
  getAllUsers,
};
