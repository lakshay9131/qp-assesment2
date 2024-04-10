// src/controllers/adminController.ts
import { Request, Response } from 'express';
import {generateToken,decodeToken} from "../utility/utility"

export const getAdminData = (req: Request, res: Response) => {
  // Logic to get admin data
  res.json({ message: 'Admin data retrieved successfully' });
};
// Example user data in database (NOSQL) (can be replaced with actual user data from the database)


export const authenticateUser = (req: Request, res: Response) => {
  // Logic to get admin data
  const {username,password}=req.body  
  const role:string = (username == process.env.ADMIN_USER) ? "ADMIN" : "USER"
   
  console.log("here",username,password,generateToken(
    username,
    role
));
  const token=generateToken(
    username,
    role
);
  console.log("here",username,password,{
    username,
    password,
    role
});
  res.json({ message: 'Login Success',role,username,token });
};



