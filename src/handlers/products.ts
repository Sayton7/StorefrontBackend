import { Request, Response } from 'express';
import { Product, Products } from '../models/product';

const products = new Products();

export const index = async (_req: Request, res: Response) => {
  try {
    const productsList = await products.index();
    res.json(productsList);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const show = async (_req: Request, res: Response) => {
  try {
    const requiredProduct = await products.show(parseInt(_req.params.id));
    res.json(requiredProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const create = async (_req: Request, res: Response) => {
  const product: Product = {
    name: _req.body.name,
    price: _req.body.price,
  };

  try {
    const newProduct = await products.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const remove = async (_req: Request, res: Response) => {
  try {
    const deletedProduct = await products.delete(_req.body.id);
    res.json(deletedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
