import { Router } from 'express';
import * as ordersR from '../handlers/orders';
import tokenAuth from '../middlewares/tokenAuth';

const ordersRoute = Router();

ordersRoute.route('/').get(tokenAuth, ordersR.index);
ordersRoute.route('/:id').get(tokenAuth, ordersR.show);
ordersRoute.route('/').post(tokenAuth, ordersR.create);
ordersRoute.route('/').delete(tokenAuth, ordersR.remove);
ordersRoute.route('/:id/products').post(tokenAuth, ordersR.addProduct);
ordersRoute.route('/:id/products').delete(tokenAuth, ordersR.removeProduct);

export default ordersRoute;
