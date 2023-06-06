# E-commerce-App
Node.JS E-Commerce API with MongoDB and Stripe

## Technology
- Node.js
- Express.js
- Mongoose ( ODM )
- MongoDB
- JWT
- Stripe API
- Nodemailer
- Multer
- MVC design pattern


## Features

This is an E-commerce API where Users can do the following:
* Create an account, log in, or log out.
* Update their profile and view it. 
* Add products to the shopping cart. 
* Delete products from the shopping cart. 
* Display the shopping cart. 
* Review any product by comment and rating. 
* Pay cash or card.
* To pay card user must be login. 
* Checkout information is processed using Stripe-Api. 

Admins can do the following:

* Update or Delete any user. 
* View all the information stored in the database. 
* They can view-add-edit-delete orders and products.


## Installation

1. git clone https://github.com/mahmoudsaad111/Ecommerce-App.git
2. cd Ecommerce-App
3. npm i
4. Set your environmental variables : 
   * MONGODB_ATLAS: This is the connection string of your MongoDB Atlas database.
   * MONGODB_PASSWORD: This is MongoDB's password.
   * JWT_TOKEN_EXPIRE, JWT_SECRET_KEY, JWT_COOKIE_EXPIRE: JWT configurations .
   * EMAIL_FROM, EMAIL_USER_NAME, EMAIL_PASSWORD: Email details for nodemailer to send email.
   * NODE_ENV: The environment of the project, you can set it to "development". 
   * STRIP_SECRET_KEY: The private key of Stripe to access payment in the checkout route.  
5. npm start 

Then you can use Postman to test all features.


## Development

* If You find any bugs, please create an issue. 
* If you want to contribute to this project then feel free to make a pull request.
* If You have suggestions or want a new feature feel free to create an issue with label features.


If you find this project useful feel free to give me a star ⭐️. 
