import { Router } from 'express';
import * as usersR from '../handlers/users';

const usersRoute = Router();

usersRoute.route('/').get(usersR.index);
usersRoute.route('/:id').get(usersR.show);
usersRoute.route('/').post(usersR.create);
usersRoute.route('/').delete(usersR.remove);
usersRoute.route('/authenticate').post(usersR.authenticate);

export default usersRoute;
