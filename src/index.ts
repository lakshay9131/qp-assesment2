// src/index.ts
import express, { Request, Response ,NextFunction} from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs'; // Import YAML library
import userRoutes from './routes/userRouter';
import adminRoutes from './routes/adminRouter';
import bodyParser from 'body-parser';
import loginRoutes from './routes/login';
// import bookModel from './database/book.model';
import dotenv from 'dotenv';

import { User } from './database/sequelize';
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


// Routes
app.use('/api/login', loginRoutes);


// try {
//   // Add models to Sequelize instance
// //   let models = [ User, Inventory, Order, OrderDetail ]
// // models.forEach(model => model.initialize(sequelize))
// // sequelize.addModels([User, Inventory, Order, OrderDetail]);

// // Synchronize models with database
// sequelize.sync({ alter: true }) // Use { force: true } to drop existing tables and re-create them
//   .then(() => {
//     console.log('Database synchronized successfully');
//   })
//   .catch((error) => {
//     console.error('Error synchronizing database:', error);
//   });

    
// } 
// catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }


//middleware
app.use("*",(req,res,next)=>{

  const token = req.headers.authorization;
    console.log("toke,", token)
  if (token) {    
      // Decode token
      const decoded = decodeToken(token);
      if (!decoded) {
          return res.status(401).json({ error: 'Invalid token' });
      }      
      //saving user info in each request
      req["user"]=decoded;
  }
  console.log("middleware ",token,req["user"])
  next();
})



app.get("/api/userinfo",(req: Request, res: Response) => {
  res.send({user:req["user"],token:req.headers.authorization});
});

//routes
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req: Request, res: Response) => {
  const j=  User.getTableName();

  res.send('Hello World2!'+j);
});

app.listen(port, () => {
  // Add models to Sequelize instance

  console.log(`Server is running on port ${port}`);
});


