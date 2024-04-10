// src/routes/adminRoutes.ts
import express from 'express';
import { getAdminData ,authenticateUser} from '../controller/loginController'
const router = express.Router();

router.post('/', (req,res)=>{authenticateUser(req,res)});
router.get("/",(req,res)=>{res.send("login")})
export default router;
