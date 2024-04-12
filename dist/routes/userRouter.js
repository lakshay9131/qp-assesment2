"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
// 2. User Responsibilities:
//    - View the list of available grocery items
//    - Ability to book multiple grocery items in a single order
router.use("*", (req, res, next) => {
    const user = req["user"];
    if (!user || !user["role"] || user["role"] != "USER") {
        res.status(400).send("Invalid User");
    }
    else {
        next();
    }
});
router.get('/', userController_1.getUserData);
router.get('/getitems', userController_1.getItems);
router.post('/bookitems', userController_1.bookitems);
exports.default = router;
