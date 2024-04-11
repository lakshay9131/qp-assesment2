// src/routes/adminRoutes.ts
import express from 'express';
import { getAdminData, addItems, updateItems, getItems, removeItems, getLevels } from '../controller/adminController';


const router = express.Router();

router.get('/', getAdminData);
router.post('/additems', addItems);
router.get('/getitems', getItems);
router.post('/removeitems', removeItems);
router.put('/updateitems/:itemId', updateItems);
router.get('/levels', getLevels);

export default router;

