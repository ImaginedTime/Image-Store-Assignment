import { Router } from 'express';
import { body, header } from 'express-validator';

import { login, register, getUser } from '../controllers/user.js';
import validateRequest from '../utils/validate.js';

const router = Router();

router.post('/login', [
    body('email').exists().isEmail(),
    body('password').exists().isLength({ min: 6 }),
    validateRequest,
], login);

router.post('/register', [
    body('name').exists().isString(),
    body('email').exists().isEmail(),
    body('password').exists().isLength({ min: 6 }),
    validateRequest,
], register);

router.get('/user', [
    header('Authorization').exists().isString(),
    validateRequest,
], getUser);

export default router;