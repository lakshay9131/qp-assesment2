"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/adminRoutes.ts
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controller/adminController");
const router = express_1.default.Router();
router.use("*", (req, res, next) => {
    const user = req["user"];
    if (!user || !user["role"] || user["role"] != "ADMIN") {
        res.status(400).send("Invalid User");
    }
    else {
        next();
    }
});
router.get('/', adminController_1.getAdminData);
router.post('/additems', adminController_1.addItems);
router.get('/getitems', adminController_1.getItems);
router.post('/removeitems', adminController_1.removeItems);
router.put('/updateitems/:itemId', adminController_1.updateItems);
router.get('/levels', adminController_1.getLevels);
exports.default = router;
