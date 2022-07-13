# Build A Storefron Backend Project

* A project to architect a database, its tables and columns to fulfill the data requirements and craft a RESTful API that exposes that information to the frontend developer.
* The server was build using express and nodejs.

## General Information

* This is the Second in Udacity's Advanced Full-Stack Web Development Nanodegree Program.
* This project is built from scratch following the REQUIREMENTS.md file of the project.
* This project is written in typescript.
* This project uses jasmine to test the models and endpoints.
* This project uses prettier configured with Eslint to format the code.
* This project uses tsc-watch to restart the server when changes are made.

## TL;DR

To ready your environment follow these steps:

* install postgresql on your machine [link](https://www.postgresql.org/download/)

* In one terminal tab, create and run the database:
  * Start psql : `psql -U postgres -h localhost`
  * `CREATE USER store_keeper WITH PASSWORD 'test_123';`
  * `CREATE DATABASE store_front;`
  * `\c store_front`
  * `GRANT ALL PRIVILEGES ON DATABASE store_front TO store_keeper;`
  * To test that it is working run `\dt` and it should output `No relations found.`
  * `\q` to exit psql

* Repeat the above steps but for the testing database:
  * Start psql : `psql -U postgres -h localhost`
  * `CREATE DATABASE store_front_test;`
  * `\c store_front`
  * `GRANT ALL PRIVILEGES ON DATABASE store_front TO store_keeper;`
  * To test that it is working run `\dt` and it should output `No relations found.`
  * `\q` to exit psql

* install all project dependencies with `npm install`

* create a file called `.env` in the root directory of the project and add the following lines:
  * `POSTGRES_HOST=127.0.0.1`
  * `POSTGRES_DB=store_front`
  * `POSTGRES_DB_TEST=store_front_test`
  * `POSTGRES_USER=store_keeper`
  * `POSTGRES_PASSWORD=test_123`
  * `POSTGRES_PORT=5432`
  * `ENV=dev`
  * `BCRYPT_PASSWORD=pepper_test_123`
  * `SALT_ROUNDS=10`
  * `TOKEN_SECRET=token_test_123`

* run `npx db-migrate up` to create the tables and columns in the database

* start the development server with `npm run tsc-watch`

## Backend Server / RESTful API

  * The API is built using express and nodejs at `localhost:3000` having the following endpoints:
    * Orders:
      * `/orders` - GET - returns a list of all orders
      * `/orders/:id` - GET - returns a specified order
      * `/orders` - POST - creates a new order
      * `/orders` - DELETE - deletes an order
      * `/orders/:id/:products` - POST - adds products to an order
      * `/orders/:id/:products` - DELETE - removes products from an order

    * Products:
      * `/products` - GET - returns a list of all products
      * `/products/:id` - GET - returns a specified product
      * `/products` - POST - creates a new product
      * `/products` - DELETE - deletes a product

    * Users:
      * `/users` - GET - returns a list of all users
      * `/users/:id` - GET - returns a specified user
      * `/users/:id/orders` - GET - returns a list of all orders for a user
      * `/users` - POST - creates a new user
      * `/users` - DELETE - deletes a user
      * `/users/authenticate` - POST - authenticates a user

## Available Scripts

In the project directory, you can run:

### `npm run lint`
This will run esLint to check the code for errors.

### `npm run prettier`
This will run prettier to format the code.

### `npm run check`
This will run prettier first then esLint to check the code for errors in one script.

### `npm run build`
This will compile the code into javascript in the build folder.

### `npm run test`
This will build the compiled code, perform the database migrations on the testing database, run jasmine tests and finally resetting the testing database.

### `npm run watch`
This will start the server using tsc-watch.