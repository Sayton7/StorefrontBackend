import { Router } from 'express';
import * as usersR from '../handlers/users';
import tokenAuth from '../middlewares/tokenAuth';

const usersRoute = Router();

usersRoute.route('/').get(tokenAuth, usersR.index);
usersRoute.route('/:id').get(tokenAuth, usersR.show);
usersRoute.route('/').post(usersR.create);
usersRoute.route('/').delete(tokenAuth, usersR.remove);
usersRoute.route('/authenticate').post(usersR.authenticate);

export default usersRoute;
