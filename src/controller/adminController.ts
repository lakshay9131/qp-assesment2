// src/controllers/adminController.ts
import { Request, Response } from 'express';

import {Inventory} from '../database/sequelize';

export const getAdminData = (req: Request, res: Response) => {
  // TODO  implement logic to get admin data here if needed
  res.json({ message: 'Admin data retrieved successfully' });
};

export const addItems = async (req: Request, res: Response) => {
  try {
    // Assuming req.body contains data for adding items
    const { itemName, price, description, quantity } = req.body;

    // Create new inventory item
    await Inventory.create({
      itemName,
      price,
      description,
      quantity,
      available:true
    });

    res.json({ message: 'Item added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item', error: error.message });
  }
};

export const updateItems = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.params; // Assuming itemId is passed in the URL parameter
    const { itemName, price, description, quantity } = req.body;

    // Find inventory item by itemId
    const item = await Inventory.findOne({ where: { id:itemId } });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Update inventory item
    await item.update({
      itemName,
      price,
      description,
      quantity,
    });

    res.json({ message: 'Item updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error: error.message });
  }
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

export const removeItems = async (req: Request, res: Response) => {
  try {
    const { itemId:id } = req.body; // Assuming itemId is passed in the URL parameter

    // Find inventory item by itemId
    const item = await Inventory.findOne({ where: { id } });
    console.log(id,req.params);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Delete inventory item
    await item.destroy();

    res.json({ message: 'Item removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item', error: error.message });
  }
};

export const getLevels = async (req: Request, res: Response) => {
  try {
    // You can implement logic to get levels here if needed
    res.json({ message: 'Levels retrieved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving levels', error: error.message });
  }
};
