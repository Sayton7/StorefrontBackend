import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const tokenAuth = (_req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = _req.headers.authorization;
    console.log(authHeader);

    if (authHeader) {
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer === 'Bearer' && token) {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);

        if (decoded) {
          next();
        } else {
          const error: Error = new Error('Invalid token');
          next(error);
        }
      } else {
        const error: Error = new Error('token not Bearer');
        next(error);
      }
    } else {
      const error: Error = new Error('No token provided');
      next(error);
    }
  } catch (err) {
    next(err);
  }
};

export default tokenAuth;
