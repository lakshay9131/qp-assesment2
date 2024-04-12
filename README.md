<h1>Project Name</h1>
Description

<strong>TODO: Add unit test and Dockerise 
Current Version is working Project having  appropriae sructure to scale and add features*.*</strong>
I have used TDD apprach  for development, Swagger for api documentation and testing(as  there are scnearios where unit tesing fails to identify issues).



This project is a web application for managing orders and inventory. It provides functionalities to create orders, add items to the inventory, and manage user accounts.

<br>
<strong>Login ,Book Items, Get Items </strong>
<div>

![image](https://github.com/lakshay9131/qp-assesment2/assets/41942751/109625c0-af58-4f5b-84eb-38d2b0d33eda)
![image](https://github.com/lakshay9131/qp-assesment2/assets/41942751/83e94488-bd12-4c4a-b076-948ad9509464)
![image](https://github.com/lakshay9131/qp-assesment2/assets/41942751/c8c4ee52-ed48-46d4-a3a9-491fef133002)
</div>



<h2>Features</h2>
User Authentication: Users can create accounts, log in, and log out.
Order Management: Users can create orders. 
Inventory Management: Admins can add items to the inventory, update item details, and remove items from the inventory.
Swagger Documentation: The API endpoints are documented using Swagger for easy reference.
<h2>Technologies Used</h2>
Node.js
Express.js
Sequelize (ORM for database management)
MySQL (or any other relational database)
Swagger (for API documentation)
Installation
Clone the repository:

bash
Copy code
git clone <repository-url>
Install dependencies:

bash
Copy code
npm install
Set up the database:

Create a MySQL database.

Update the database configuration in the config/database.js file.

Run migrations to create database tables:

bash
Copy code
npx sequelize-cli db:migrate
Start the server:![Uploading image.png…]()


bash
Copy code
npm start
Access the application in your web browser at http://localhost:3000.

API Documentation
The API endpoints are documented using Swagger. You can access the Swagger documentation by navigating to http://localhost:3000/api-docs in your web browser after starting the server.

License
This project is licensed under the MIT License - see the LICENSE file for details.

