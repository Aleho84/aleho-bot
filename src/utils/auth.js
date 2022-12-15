import passport from 'passport'
import { readUser } from '../utils/readUser.js'

export const auth = function (req, res, next) {
    if (req.user === undefined) {
        return res.render('msgpage', { user: readUser(req), msg: 'No Autorizado' })
    }
    next()
}

