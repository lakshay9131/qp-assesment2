import { Sequelize,DataTypes } from 'sequelize';

import path from 'path';

const   sequelize = new Sequelize({
  database: 'qp-assignment',
  username: 'root',
  password: 'password',
  dialect: 'mysql', // Change this according to your database dialect
  host: 'localhost', // Change this according to your database host
  port: 3306, // Change this according to your database port
 
});
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

export  {sequelize}
