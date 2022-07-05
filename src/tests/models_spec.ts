import { Users } from '../models/user';
import { Products } from '../models/product';
import { Orders } from '../models/order';

const users = new Users();
const products = new Products();
const orders = new Orders();

// Start of User model

describe('Users model', () => {
  it('create method should add a user', async () => {
    const result = await users.create({
      user_name: 'user_name',
      password: 'password',
    });
    expect(result).toEqual({
      id: 1,
      user_name: 'user_name',
      password: 'password',
    });
  });

  it('index method should return a list of users', async () => {
    const result = await users.index();
    expect(result).toEqual([
      {
        id: 1,
        user_name: 'user_name',
        password: 'password',
      },
    ]);
  });

  it('show method should return the correct user', async () => {
    const result = await users.show(1);
    expect(result).toEqual({
      id: 1,
      user_name: 'user_name',
      password: 'password',
    });
  });

  // Start of Product model

  describe('Products model', () => {
    it('create method should add a product', async () => {
      const result = await products.create({
        name: 'charger',
        price: 20,
      });
      expect(result).toEqual({
        id: 1,
        name: 'charger',
        price: 20,
      });
    });

    it('index method should return a list of products', async () => {
      const result = await products.index();
      expect(result).toEqual([
        {
          id: 1,
          name: 'charger',
          price: 20,
        },
      ]);
    });

    it('show method should return the correct product', async () => {
      const result = await products.show(1);
      expect(result).toEqual({
        id: 1,
        name: 'charger',
        price: 20,
      });
    });

    // Start of Order model

    describe('Orders model', () => {
      it('create method should add an order', async () => {
        const result = await orders.create({
          status: 'active',
          user_id: 1,
        });
        expect(result).toEqual({
          id: 1,
          status: 'active',
          user_id: 1,
        });
      });

      it('index method should return a list of products', async () => {
        const result = await orders.index();
        expect(result).toEqual([
          {
            id: 1,
            status: 'active',
            user_id: 1,
          },
        ]);
      });

      it('show method should return the correct product', async () => {
        const result = await orders.show(1);
        expect(result).toEqual({
          id: 1,
          status: 'active',
          user_id: 1,
        });
      });

      it('addProduct method should add product to order_products table', async () => {
        const result = await orders.addProduct(20, 1, 1);
        expect(result).toEqual({
          id: 1,
          quantity: 20,
          order_id: 1,
          product_id: 1,
        });
      });

      it('removeProduct method should remove product from order_products table', async () => {
        const result = await orders.removeProduct(1);
        expect(result).toEqual({
          id: 1,
          quantity: 20,
          order_id: 1,
          product_id: 1,
        });
      });

      it('delete method should remove correct order', async () => {
        const result = await orders.delete(1);
        expect(result).toEqual({
          id: 1,
          status: 'active',
          user_id: 1,
        });
      });
    });

    //End of Order model

    it('delete method should remove correct product', async () => {
      const result = await products.delete(1);
      expect(result).toEqual({
        id: 1,
        name: 'charger',
        price: 20,
      });
    });
  });

  // End of Product model

  it('delete method should remove correct user', async () => {
    const result = await users.delete(1);
    expect(result).toEqual({
      id: 1,
      user_name: 'user_name',
      password: 'password',
    });
  });
});

// End of User model
