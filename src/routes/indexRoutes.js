import { Router } from 'express'
import passport from 'passport'
import { auth } from '../utils/auth.js'

const indexRouter = Router()

import {
    getIndexPage,
    getLoginPage,
    getSigninPage,
    getLoginFail,
    getSigninFail,
    getLogout,
    getLogger
} from '../controllers/indexController.js'

indexRouter.get('/', getIndexPage)
indexRouter.get('/login', getLoginPage)
indexRouter.get('/signin', getSigninPage)
indexRouter.get('/loginfail', getLoginFail)
indexRouter.get('/signinfail', getSigninFail)
indexRouter.get('/logout', getLogout)
indexRouter.get('/logger', auth, getLogger)

indexRouter.post('/loginreq', passport.authenticate('login', { failureRedirect: '/loginfail' }), getIndexPage)
indexRouter.post('/signinreq', passport.authenticate('signin', { failureRedirect: '/signinfail' }), getIndexPage)

export default indexRouter