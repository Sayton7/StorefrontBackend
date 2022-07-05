# Build A Storefron Backend Project

Setup
To ready your environment follow these steps: In one terminal tab, create and run the database:

Switch to the postgres user su postgres
Start psql : psql -U postgres -h localhost
In psql run the following:
  `CREATE USER store_keeper WITH PASSWORD 'test_123';`
  `CREATE DATABASE store_front;`
  `\c store_front`
  `GRANT ALL PRIVILEGES ON DATABASE store_front TO store_keeper;`
  Do the same for the testing db:
  `CREATE DATABASE store_front_test;`
  `\c store_front_test`
  `GRANT ALL PRIVILEGES ON DATABASE store_front TO store_keeper;`
To test that it is working run \dt and it should output "No relations found."