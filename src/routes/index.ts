import { Router } from 'express';
import ordersRoute from './ordersRoute';
import productsRoute from './productsRoute';
import usersRoute from './usersRoute';

const routes = Router();

routes.use('/orders', ordersRoute);
routes.use('/products', productsRoute);
routes.use('/users', usersRoute);

export default routes;
