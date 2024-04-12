// src/controllers/userController.ts
import { Request, Response } from 'express';

import {Inventory,Order, OrderDetail} from '../database/sequelize';

export const getUserData = (req: Request, res: Response) => {
  // Logic to get user data
  res.json({ message: 'User data retrieved successfully' });
};

export const getItems = async (req: Request, res: Response) => {
  try {
    // Retrieve all inventory items
    const items = await Inventory.findAll();

    res.json({ items });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving items', error: error.message });
  }
};
export const bookitems = async (req: Request, res: Response) => {
  // Logic to get book order
  try {
    // Parse necessary data from the request body
    const userId=req["user"].username;
    const {  delivery, items,subtotal } = req.body;
    

    // Validate each item in the items array
    const isValidItems = await Promise.all(items.map(validateItem));

    if (isValidItems.includes(false)) {
      return res.status(400).json({ message: 'Invalid item structure or item not found / not in stock' });
    }
    // Array to store the created orders
    const createdOrders = [];
    const order = await  Order.create({
      delivery,
      userInfo:userId,subtotal,items: JSON.stringify(items)
    });

    // Iterate over each item in the items array
    for (const item of items) {
      // Destructure item properties
      const { itemId, quantity, totalPrice } = item;

      // Create a new order in the database
      const insertitem = await OrderDetail.create({
        orderId:order["id"],
        itemId,quantity,totalPrice
      });

      // Push the created order to the array
      createdOrders.push(insertitem);
    }

    res.json({ message: 'Orders created successfully', order,createdOrders });
  } catch (error) {
    console.error('Error creating orders:', error);
    res.status(500).json({ message: 'Failed to create orders', error: error.message });
  }
};
// Function to validate the structure of each item
const validateItem = async (item: any) => {
  // TODO   check price and subtotal
  if (!item || typeof item !== 'object') {
    return false;
  }

  if (typeof item.itemId !== 'number' || typeof item.quantity !== 'number' || typeof item.totalPrice !== 'number') {
    return false;
  }

  // Check if the item exists in the inventory 
  const inventoryItem = await Inventory.findOne({ where: { id:item.itemId } });
  // Check if quantity availbe , and item is in stock 
  const instock=inventoryItem.getDataValue("available") && inventoryItem.getDataValue("quantity")>=item.quantity;
  if (!inventoryItem ||  !instock) {
    return false;
  }

  return true;
};