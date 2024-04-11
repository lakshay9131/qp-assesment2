// src/routes/userRoutes.ts
import express from 'express';
import { getUserData } from '../controller/userController';

const router = express.Router();
// 2. User Responsibilities:
//    - View the list of available grocery items
//    - Ability to book multiple grocery items in a single order

router.get('/', getUserData);

export default router;
