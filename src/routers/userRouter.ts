import Router from 'express';
import * as usersController from '../controllers/userController';

const router = new (Router as any)();

router.post('/users', usersController.userSignUp);
router.get('/ranking', usersController.rankingUsers);

export default router;
