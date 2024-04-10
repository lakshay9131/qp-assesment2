// src/controllers/adminController.ts
import { Request, Response } from 'express';

export const getAdminData = (req: Request, res: Response) => {
  // Logic to get admin data
  res.json({ message: 'Admin data retrieved successfully' });
};
