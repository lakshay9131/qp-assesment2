// src/routes/userRoutes.ts
import express from 'express';
import { getUserData,getItems, bookitems } from '../controller/userController';

const router = express.Router();
// 2. User Responsibilities:
//    - View the list of available grocery items
//    - Ability to book multiple grocery items in a single order

router.use("*",(req,res,next)=>{
const user=req["user"];
if(!user || !user["role"]||user["role"]!="USER"){
 res.status(400).send("Invalid User");
}
else{
    next()
}

})

router.get('/', getUserData);
router.get('/getitems', getItems);
router.post('/bookitems', bookitems);

export default router;
