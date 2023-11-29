import { Router } from 'express';
import { createUser, getUsersById, login, updateUsersById } from '../controllers/auth.controller';
import validateToken from '../services/validateToken';

const router = Router();

router.post('/auth/create', createUser);

router.post('/auth/login', login)

router.patch('/user/:id', validateToken, updateUsersById)

router.get('/user/:id', validateToken, getUsersById)

export default router;