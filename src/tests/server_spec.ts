import supertest from 'supertest';
import app from '../server';

const request = supertest(app);
let user_id: number;
let product_id: number;
let order_id: number;
let token: string;

// Start of Users Endpoints

describe('Users Endpoints', async () => {
  it('should create a new user', async () => {
    const res = await request
      .post('/users')
      .set('Content-Type', 'application/json')
      .send({
        user_name: 'user_name',
        password: 'password',
      });
    user_id = res.body.id;
    expect(res.body.user_name).toEqual('user_name');
  });

  it('should authenticate a user', async () => {
    const res = await request
      .post('/users/authenticate')
      .set('Content-Type', 'application/json')
      .send({
        user_name: 'user_name',
        password: 'password',
      });
    token = res.body;
    expect(token.split('.')[0]).toEqual('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
  });

  it('should show a list of users', async () => {
    const res = await request
      .get('/users')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(res.body[0].user_name).toEqual('user_name');
  });

  it('should show a specified user', async () => {
    const res = await request
      .get(`/users/${user_id}`)
      .set('Content_Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(res.body.user_name).toEqual('user_name');
  });

  // Start of Products Endpoints

  describe('Products Endpoints', async () => {
    it('should create a new product', async () => {
      const res = await request
        .post('/products')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'test_product',
          price: 50,
        });
      product_id = res.body.id;
      expect(res.body.name).toEqual('test_product');
    });

    it('should show a list of products', async () => {
      const res = await request
        .get('/products')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.body[0].name).toEqual('test_product');
    });

    it('should show a specified product', async () => {
      const res = await request
        .get(`/products/${product_id}`)
        .set('Content_Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.body.name).toEqual('test_product');
    });

    // Start of Orders Endpoints

    describe('Orders Endpoints', async () => {
      it('should create a new order', async () => {
        const res = await request
          .post('/orders')
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({
            status: 'active',
            user_id: user_id,
          });
        order_id = res.body.id;
        expect(res.body.status).toEqual('active');
      });

      it('should show a list of orders', async () => {
        const res = await request
          .get('/orders')
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);
        expect(res.body[0].status).toEqual('active');
      });

      it('should show a specified order', async () => {
        const res = await request
          .get(`/orders/${order_id}`)
          .set('Content_Type', 'application/json')
          .set('Authorization', `Bearer ${token}`);
        expect(res.body.status).toEqual('active');
      });

      it('should add a product to an order', async () => {
        const res = await request
          .post(`/orders/${order_id}/products`)
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({
            quantity: 50,
            product_id,
          });
        expect(res.body.quantity).toEqual(50);
      });

      it('should remove a product from an order', async () => {
        const res = await request
          .delete(`/orders/${order_id}/products/`)
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({
            id: product_id,
          });
        expect(res.body.quantity).toEqual(50);
      });

      it('should remove an order', async () => {
        const res = await request
          .delete('/orders')
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({
            id: order_id,
          });
        expect(res.body.status).toEqual('active');
      });
    });

    // End of Orders Endpoints

    it('should remove a product', async () => {
      const res = await request
        .delete('/products')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: product_id,
        });
      expect(res.body.name).toEqual('test_product');
    });
  });

  // End of Products Endpoints

  it('should remove a user', async () => {
    const res = await request
      .delete('/users')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: user_id,
      });
    expect(res.body.user_name).toEqual('user_name');
  });
});

// End of Users Endpoints
