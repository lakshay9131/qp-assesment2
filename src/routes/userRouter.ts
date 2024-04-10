// src/routes/userRoutes.ts
import express from 'express';
import { getUserData } from '../controller/userController';

const router = express.Router();

router.get('/', getUserData);

export default router;
