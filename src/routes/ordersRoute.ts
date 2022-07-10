import { Router } from 'express';
import * as ordersR from '../handlers/orders';

const ordersRoute = Router();

ordersRoute.route('/').get(ordersR.index);
ordersRoute.route('/:id').get(ordersR.show);
ordersRoute.route('/').post(ordersR.create);
ordersRoute.route('/').delete(ordersR.remove);
ordersRoute.route('/:id/products').post(ordersR.addProduct);
ordersRoute.route('/:id/products').delete(ordersR.removeProduct);

export default ordersRoute;
