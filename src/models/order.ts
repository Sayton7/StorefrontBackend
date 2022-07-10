import { client } from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: number;
};

export type OrderProducts = {
  id?: number;
  quantity: number;
  order_id: number;
  product_id: number;
};

export class Orders {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get orders: ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot find order: ${err}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
      const result = await conn.query(sql, [o.status, o.user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot add new order: ${err}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot delete order: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    oderID: number,
    productID: number
  ): Promise<OrderProducts> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [quantity, oderID, productID]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot add product to order: ${err}`);
    }
  }

  async removeProduct(id: number): Promise<OrderProducts> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM order_products WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot remove product order: ${err}`);
    }
  }
}
