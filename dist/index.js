"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs")); // Import YAML library
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const adminRouter_1 = __importDefault(require("./routes/adminRouter"));
const body_parser_1 = __importDefault(require("body-parser"));
const login_1 = __importDefault(require("./routes/login"));
// import bookModel from './database/book.model';
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("./database/sequelize");
const utility_1 = require("./utility/utility");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
console.log(process.version);
// Load Swagger YAML file
const swaggerDocument = yamljs_1.default.load('./swagger.yaml');
// Serve Swagger UI
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// Use body-parser middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api/login', login_1.default);
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
app.use("*", (req, res, next) => {
    const token = req.headers.authorization;
    console.log("toke,", token);
    if (token) {
        // Decode token
        const decoded = (0, utility_1.decodeToken)(token);
        if (!decoded) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        //saving user info in each request
        req["user"] = decoded;
    }
    console.log("middleware ", token, req["user"]);
    next();
});
app.get("/api/userinfo", (req, res) => {
    res.send({ user: req["user"], token: req.headers.authorization });
});
//routes
app.use('/api/user', userRouter_1.default);
app.use('/api/admin', adminRouter_1.default);
app.get('/', (req, res) => {
    const j = sequelize_1.User.getTableName();
    res.send('Hello World2!' + j);
});
app.listen(port, () => {
    // Add models to Sequelize instance
    console.log(`Server is running on port ${port}`);
});
