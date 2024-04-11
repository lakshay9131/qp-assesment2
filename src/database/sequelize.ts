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



const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Add any additional fields here
}, {
  tableName: 'users', // Name of the table
});


const Order = sequelize.define("Order", {
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  delivery: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  userInfo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  items: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'orders', // Name of the table
});



const OrderDetail = sequelize.define("OrderDetail", {
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT, // Assuming totalPrice is a floating-point number
    allowNull: false,
  },
}, {
  tableName: 'order_details', // Name of the table
});

const Inventory = sequelize.define('Inventory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  itemName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: 'inventory', // Name of the table
});

Order.hasMany(OrderDetail, { foreignKey: 'orderId' });
OrderDetail.belongsTo(Order, { foreignKey: 'orderId' });

sequelize.sync().then(() => {
  console.log('Database Sync Success!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

export  {sequelize,Inventory,User,Order,OrderDetail}
