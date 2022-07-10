import { Router } from 'express';
import * as productsR from '../handlers/products';

const productsRoute = Router();

productsRoute.route('/').get(productsR.index);
productsRoute.route('/:id').get(productsR.show);
productsRoute.route('/').post(productsR.create);
productsRoute.route('/').delete(productsR.remove);

export default productsRoute;
