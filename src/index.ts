// src/index.ts
import express, { Request, Response ,NextFunction} from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs'; // Import YAML library

import adminRoutes from './routes/adminRouter';
import bodyParser from 'body-parser';
import loginRoutes from './routes/login';
// import bookModel from './database/book.model';
import dotenv from 'dotenv';

import { decodeToken } from './utility/utility';

dotenv.config();

const app = express();
const port = 3000;
console.log(process.version)

// Load Swagger YAML file
const swaggerDocument = YAML.load('./swagger.yaml');

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes With-Out Authorisation
app.use('/api/login', loginRoutes);

app.get('/', (req: Request, res: Response) => {
  
  res.send('Question Generator!');
});


app.get("/api/generatePaper",(req: Request, res: Response) => {
  // generate paper
  res.send({user:req["user"],token:req.headers.authorization});
});


//  Authorisation Checkmiddleware for Admin Routes
app.use("*",(req,res,next)=>{

 
  // const token = req.headers.authorization;
  //   console.log("toke,", token)
  // if (token) {    
  //     // Decode token
  //     const decoded = decodeToken(token);
  //     if (!decoded) {
  //         return res.status(401).json({ error: 'Invalid token' });
  //     }      
  //     //saving user info in each request
  //     req["user"]=decoded;
  // }
  // console.log("middleware ",token,req["user"])
  next();
})


//admin routes to add,remove,update etc questions and other Admin tasks
app.use('/api/admin', adminRoutes);



app.listen(port, () => {
  // Add models to Sequelize instance

  console.log(`Server is running on port ${port}`);
});


