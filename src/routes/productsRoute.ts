import { Router } from 'express';
import * as productsR from '../handlers/products';
import tokenAuth from '../middlewares/tokenAuth';

const productsRoute = Router();

productsRoute.route('/').get(productsR.index);
productsRoute.route('/:id').get(productsR.show);
productsRoute.route('/').post(tokenAuth, productsR.create);
productsRoute.route('/').delete(tokenAuth, productsR.remove);

export default productsRoute;
