"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetail = exports.Order = exports.User = exports.Inventory = exports.sequelize = void 0;
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
const User = sequelize.define("User", {
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    // Add any additional fields here
}, {
    tableName: 'users', // Name of the table
});
exports.User = User;
const Order = sequelize.define("Order", {
    subtotal: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    delivery: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    userInfo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    items: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'orders', // Name of the table
});
exports.Order = Order;
const OrderDetail = sequelize.define("OrderDetail", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    orderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    itemId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    totalPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'order_details', // Name of the table
});
exports.OrderDetail = OrderDetail;
const Inventory = sequelize.define('Inventory', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    itemName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    available: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'inventory', // Name of the table
});
exports.Inventory = Inventory;
Order.hasMany(OrderDetail, { foreignKey: 'orderId' });
OrderDetail.belongsTo(Order, { foreignKey: 'orderId' });
sequelize.sync().then(() => {
    console.log('Database Sync Success!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
