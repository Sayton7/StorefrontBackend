import { Request, Response } from 'express';
import { User, Users } from '../models/user';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const users = new Users();

export const index = async (_req: Request, res: Response) => {
  try {
    const usersList = await users.index();
    res.json(usersList);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const show = async (_req: Request, res: Response) => {
  try {
    const requiredUser = await users.show(parseInt(_req.params.id));
    res.json(requiredUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const create = async (_req: Request, res: Response) => {
  const user: User = {
    user_name: _req.body.user_name,
    password: _req.body.password,
  };

  try {
    const newUser = await users.create(user);
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const remove = async (_req: Request, res: Response) => {
  try {
    const deletedUser = await users.delete(_req.body.id);
    res.json(deletedUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const authenticate = async (_req: Request, res: Response) => {
  const user: User = {
    user_name: _req.body.user_name,
    password: _req.body.password,
  };

  try {
    const authenticatedUser = await users.authenticate(
      user.user_name,
      user.password
    );
    const token = jwt.sign(
      { user: authenticatedUser },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const showUserOrders = async (_req: Request, res: Response) => {
  try {
    const userOrders = await users.showUserOrders(parseInt(_req.params.id));
    res.json(userOrders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
