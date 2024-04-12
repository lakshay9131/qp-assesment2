"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookitems = exports.getItems = exports.getUserData = void 0;
const sequelize_1 = require("../database/sequelize");
const getUserData = (req, res) => {
    // Logic to get user data
    res.json({ message: 'User data retrieved successfully' });
};
exports.getUserData = getUserData;
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve all inventory items
        const items = yield sequelize_1.Inventory.findAll();
        res.json({ items });
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving items', error: error.message });
    }
});
exports.getItems = getItems;
const bookitems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Logic to get book order
    try {
        // Parse necessary data from the request body
        const userId = req["user"].username;
        const { delivery, items, subtotal } = req.body;
        // Validate each item in the items array
        const isValidItems = yield Promise.all(items.map(validateItem));
        if (isValidItems.includes(false)) {
            return res.status(400).json({ message: 'Invalid item structure or item not found / not in stock' });
        }
        // Array to store the created orders
        const createdOrders = [];
        const order = yield sequelize_1.Order.create({
            delivery,
            userInfo: userId, subtotal, items: JSON.stringify(items)
        });
        // Iterate over each item in the items array
        for (const item of items) {
            // Destructure item properties
            const { itemId, quantity, totalPrice } = item;
            // Create a new order in the database
            const insertitem = yield sequelize_1.OrderDetail.create({
                orderId: order["id"],
                itemId, quantity, totalPrice
            });
            // Push the created order to the array
            createdOrders.push(insertitem);
        }
        res.json({ message: 'Orders created successfully', order, createdOrders });
    }
    catch (error) {
        console.error('Error creating orders:', error);
        res.status(500).json({ message: 'Failed to create orders', error: error.message });
    }
});
exports.bookitems = bookitems;
// Function to validate the structure of each item
const validateItem = (item) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO   check price and subtotal
    if (!item || typeof item !== 'object') {
        return false;
    }
    if (typeof item.itemId !== 'number' || typeof item.quantity !== 'number' || typeof item.totalPrice !== 'number') {
        return false;
    }
    // Check if the item exists in the inventory 
    const inventoryItem = yield sequelize_1.Inventory.findOne({ where: { id: item.itemId } });
    // Check if quantity availbe , and item is in stock 
    const instock = inventoryItem.getDataValue("available") && inventoryItem.getDataValue("quantity") >= item.quantity;
    if (!inventoryItem || !instock) {
        return false;
    }
    return true;
});
