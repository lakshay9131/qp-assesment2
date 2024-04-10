// src/controllers/userController.ts
import { Request, Response } from 'express';

export const getUserData = (req: Request, res: Response) => {
  // Logic to get user data
  res.json({ message: 'User data retrieved successfully' });
};
