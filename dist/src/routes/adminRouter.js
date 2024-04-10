"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/adminRoutes.ts
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controller/adminController");
const router = express_1.default.Router();
router.get('/', adminController_1.getAdminData);
exports.default = router;
