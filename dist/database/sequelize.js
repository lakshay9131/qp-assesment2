"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    database: 'qp-assignment',
    username: 'root',
    password: 'password',
    dialect: 'mysql',
    host: 'localhost',
    port: 3306, // Change this according to your database port
});
exports.sequelize = sequelize;
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully2.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});
//  models 
// const User = sequelize.define("User", {
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   role: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },  
//   // Add any additional fields here
// }, {
//   tableName: 'users', // Name of the table
// });
sequelize.sync().then(() => {
    console.log('Database Sync Success!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
