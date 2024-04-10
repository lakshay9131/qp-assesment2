// src/index.ts
import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs'; // Import YAML library
import userRoutes from './routes/userRouter';
import adminRoutes from './routes/adminRouter';
import bodyParser from 'body-parser';
import loginRoutes from './routes/login';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = 3000;

// Load Swagger YAML file
const swaggerDocument = YAML.load('./swagger.yaml');

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes
app.use('/api/login', loginRoutes);

//middleware
app.use("*",(req,res)=>{
  if(req.headers.token)
  next();
})
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World2!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
function next() {
  throw new Error('Function not implemented.');
}

