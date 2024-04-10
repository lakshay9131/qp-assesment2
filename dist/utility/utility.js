"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.generateToken = void 0;
const jwt = require('jsonwebtoken');
require('dotenv').config();
// Function to generate JWT token
function generateToken(username, role) {
    console.log("", process.env.JWT_SECRET);
    return jwt.sign({ username, role }, process.env.JWT_SECRET, {
        expiresIn: '1h' // Token expires in 1 hour
    });
}
exports.generateToken = generateToken;
// Function to decode JWT token
function decodeToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    }
    catch (error) {
        return null; // Invalid token
    }
}
exports.decodeToken = decodeToken;
