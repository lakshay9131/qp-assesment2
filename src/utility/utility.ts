const jwt = require('jsonwebtoken');
require('dotenv').config();
// Function to generate JWT token
export function generateToken(username:string,role:string):any {
    console.log("", process.env.JWT_SECRET,    );    

    return jwt.sign({  username, role }, process.env.JWT_SECRET, {
        expiresIn: '1h' // Token expires in 1 hour
    });
}

// Function to decode JWT token
export function decodeToken(token:string):any{
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null; // Invalid token
    }
}
