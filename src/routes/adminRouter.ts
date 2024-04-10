// src/routes/adminRoutes.ts
import express from 'express';
import { getAdminData } from '../controller/adminController';

const router = express.Router();

router.get('/', getAdminData);

export default router;
