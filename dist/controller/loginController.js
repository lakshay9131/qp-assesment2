"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.getAdminData = void 0;
const utility_1 = require("../utility/utility");
const getAdminData = (req, res) => {
    // Logic to get admin data
    res.json({ message: 'Admin data retrieved successfully' });
};
exports.getAdminData = getAdminData;
// Example user data in database (NOSQL) (can be replaced with actual user data from the database)
const authenticateUser = (req, res) => {
    // Logic to get admin data
    const { username, password } = req.body;
    const role = (username == process.env.ADMIN_USER) ? "ADMIN" : "USER";
    console.log("here", username, password, (0, utility_1.generateToken)(username, role));
    const token = (0, utility_1.generateToken)(username, role);
    console.log("here", username, password, {
        username,
        password,
        role
    });
    res.json({ message: 'Login Success', role, username, token });
};
exports.authenticateUser = authenticateUser;
