# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index
- Show
- Create [token required]
- Delete [token required]
<!-- - [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category) -->

#### Users
- Index [token required]
- Show [token required]
- Current Orders by user (args: user id)[token required]
- Create
- Delete [token required]
- Authenticate

#### Orders
- Index [token required]
- Show [token required]
- Create [token required]
- Delete [token required]
- Add Product to Order [token required]
- Remove Product from Order [token required]
<!-- - [OPTIONAL] Completed Orders by user (args: user id)[token required] -->

## Data Shapes
#### Product

| Column | Type |
| --- | --- |
| id | PRIMARY KEY |
| name | VARCHAR(100) |
| price | INTEGER |

#### User

| Column | Type |
| --- | --- |
| id | PRIMARY KEY |
| user_name | VARCHAR(100) |
| password | VARCHAR(100) |

#### Orders

| Column | Type |
| --- | --- |
| id | PRIMARY KEY |
| status | TEXT IN ('active', 'complete') |
| user_id | INTEGER REFERENCES users(id) |

#### Order-Products

| Column | Type |
| --- | --- |
| id | PRIMARY KEY |
| quantity | INTEGER |
| oder_id | INTEGER REFERENCES orders(id) |
| product_id | INTEGER REFERENCES products(id) |
