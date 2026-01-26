import { Router } from 'express';
import passport from 'passport';
import { auth, isAdmin } from '../config/jsonwebtoken.js';
import { validateRequest } from '../middlewares/validationMiddleware.js';
import { loginSchema, signinSchema, userIdSchema } from '../validators/userValidators.js';

const userRouter = Router();

import {
    login,
    loginError,
    signin,
    signinError,
    logout,
    currentUser,
    deleteUser
} from '../controllers/usersController.js';

userRouter.get('/login', loginError);
userRouter.get('/signin', signinError);
userRouter.get('/logout', logout);
userRouter.get('/currentUser', currentUser);
userRouter.post('/login', validateRequest(loginSchema), passport.authenticate('login', { failureRedirect: '/api/users/login' }), login);
userRouter.post('/signin', validateRequest(signinSchema), passport.authenticate('signin', { failureRedirect: '/api/users/signin' }), signin);
userRouter.delete('/delete/:id', auth, isAdmin, validateRequest(userIdSchema, 'params'), deleteUser);

export default userRouter;