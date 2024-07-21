
import express from 'express';
import authMiddleware from '../middelwares/auth-middleware.js'
import {home ,  register, login, user} from '../controllers/auth-control.js';
import { validate } from '../middelwares/validate_middleware.js';
import { signUpSchema } from '../validator/authValidator.js';
const router = express.Router()

router.route('/').get(home)

router.route('/registration').post(validate(signUpSchema), register)

router.route('/login').post(login)

router.route('/user').get(authMiddleware, user)

export default router;