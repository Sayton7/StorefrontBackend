import { Request, Response } from 'express';
import { Order, Orders } from '../models/order';

const orders = new Orders();

export const index = async (_req: Request, res: Response) => {
  try {
    const ordersList = await orders.index();
    res.json(ordersList);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const show = async (_req: Request, res: Response) => {
  try {
    const requiredOrder = await orders.show(parseInt(_req.params.id));
    res.json(requiredOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const create = async (_req: Request, res: Response) => {
  const order: Order = {
    status: _req.body.status,
    user_id: _req.body.user_id,
  };

  try {
    const newOrder = await orders.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const remove = async (_req: Request, res: Response) => {
  try {
    const deletedOrder = await orders.delete(_req.body.id);
    res.json(deletedOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const addProduct = async (_req: Request, res: Response) => {
  const quantity: number = parseInt(_req.body.quantity);
  const order_id: number = parseInt(_req.params.id);
  const product_id: number = parseInt(_req.body.product_id);

  try {
    const addedProduct = await orders.addProduct(
      quantity,
      order_id,
      product_id
    );
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const removeProduct = async (_req: Request, res: Response) => {
  try {
    const removedProduct = await orders.removeProduct(_req.body.id);
    res.json(removedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
