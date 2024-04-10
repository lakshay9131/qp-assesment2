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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
// Load Swagger YAML file
const swaggerDocument = yamljs_1.default.load('./swagger.yaml');
// Serve Swagger UI
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// Use body-parser middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api/login', login_1.default);
app.use('/api/user', userRouter_1.default);
app.use('/api/admin', adminRouter_1.default);
app.get('/', (req, res) => {
    res.send('Hello World2!');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
