import { Request, Response } from 'express';
import { userServices } from './user.service';
import UserSchemaValidation from './user.validate';

const createUser = async (req: Request, res: Response) => {
  try {
    const zodParsedUserData = UserSchemaValidation.parse(req.body);
    const result = await userServices.createUser(zodParsedUserData);
    const { password, ...rest }: { password: string; [key: string]: unknown } =
      result;
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: rest,
    });
  } catch (error: any) {
    res.json(error);
  }
};

export const UserController = {
  createUser,
};
