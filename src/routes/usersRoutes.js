import { Router } from 'express'
import passport from 'passport'
import { auth } from '../config/jsonwebtoken.js'

const userRouter = Router()

import {
    login,
    loginError,
    signin,
    signinError,
    logout,
    currentUser,
    deleteUser
} from '../controllers/usersController.js'


userRouter.get('/login', loginError)
userRouter.get('/signin', signinError)
userRouter.get('/logout', logout)

// CON PASSPORT
userRouter.post('/login', passport.authenticate('login', { failureRedirect: '/api/users/login' }), login)
userRouter.post('/signin', passport.authenticate('signin', { failureRedirect: '/api/users/signin' }), signin)

// CON JSONWEBTOKEN
// userRouter.post('/login', login)
// userRouter.post('/signin', signin)

userRouter.get('/currentUser', currentUser)
userRouter.delete('/delete/:id', auth, deleteUser)

export default userRouter