import { Users } from '../models/user';
import { Products } from '../models/product';
import { Orders } from '../models/order';

const users = new Users();
const products = new Products();
const orders = new Orders();

// Start of User Model

describe('Users model', () => {
  it('create method should add a user', async () => {
    const result = await users.create({
      user_name: 'user_name',
      password: 'password',
    });
    expect(result.user_name).toEqual('user_name');
  });

  it('authenticate method should check if the password is valid', async () => {
    const result = await users.authenticate('user_name', 'password');
    if (result) {
      expect(result.user_name).toEqual('user_name');
    } else if (!result) {
      expect(result).toEqual(null);
    }
  });

  it('index method should return a list of users', async () => {
    const result = await users.index();
    expect(result[0].user_name).toEqual('user_name');
  });

  it('show method should return the correct user', async () => {
    const result = await users.show(1);
    expect(result.user_name).toEqual('user_name');
  });

  // Start of Product Model

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

    // Start of Order Model

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

      it('index method should return a list of orders', async () => {
        const result = await orders.index();
        expect(result).toEqual([
          {
            id: 1,
            status: 'active',
            user_id: 1,
          },
        ]);
      });

      it('show method should return the correct order', async () => {
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

      // placed here from the user model for the sake of testing order
      it('show orders made by a specific user', async () => {
        const result = await users.showUserOrders(1);
        expect(result).toEqual([
          {
            id: 1,
            status: 'active',
            user_id: 1,
          },
        ]);
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

    //End of Order Model

    it('delete method should remove correct product', async () => {
      const result = await products.delete(1);
      expect(result).toEqual({
        id: 1,
        name: 'charger',
        price: 20,
      });
    });
  });

  // End of Product Model

  it('delete method should remove correct user', async () => {
    const result = await users.delete(1);
    expect(result.user_name).toEqual('user_name');
  });
});

// End of User Model
