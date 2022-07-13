import { client } from '../database';
import { Order } from './order';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;
const salt = parseInt(process.env.SALT_ROUNDS as string, 10);
const hashPassword = (pwd: string) => {
  return bcrypt.hashSync(pwd + pepper, salt);
};

export type User = {
  id?: number;
  user_name: string;
  password: string;
};

export class Users {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot find user: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (user_name, password) VALUES ($1, $2) RETURNING *';
      const result = await conn.query(sql, [
        u.user_name,
        hashPassword(u.password),
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot add new user: ${err}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot delete user: ${err}`);
    }
  }

  async authenticate(
    user_name: string,
    password: string
  ): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT password FROM users WHERE user_name=($1)';
      const result = await conn.query(sql, [user_name]);

      if (result.rows.length) {
        const pwd = result.rows[0];
        const isValid = bcrypt.compareSync(password + pepper, pwd.password);
        if (isValid) {
          const userInfo = await conn.query(
            'SELECT id, user_name FROM users WHERE user_name=($1)',
            [user_name]
          );
          return userInfo.rows[0];
        }
      }
      conn.release();
      return null;
    } catch (err) {
      throw new Error(`Cannot authenticate user: ${err}`);
    }
  }

  async showUserOrders(id: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get orders: ${err}`);
    }
  }
}
