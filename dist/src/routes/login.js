"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/adminRoutes.ts
const express_1 = __importDefault(require("express"));
const loginController_1 = require("../controller/loginController");
const router = express_1.default.Router();
router.post('/', loginController_1.authenticateUser);
router.get("/", (req, res) => { res.send("login"); });
exports.default = router;
