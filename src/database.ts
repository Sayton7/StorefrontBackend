import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  ENV,
} = process.env;

export let client: Pool;
console.log(ENV);

if (ENV === 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: parseInt(POSTGRES_PORT as string, 10),
  });
} else if (ENV === 'test') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: parseInt(POSTGRES_PORT as string, 10),
  });
}
