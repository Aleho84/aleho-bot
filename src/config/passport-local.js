import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { usersDao } from '../daos/index.js'
import { encryptPassword, comparePassword } from '../utils/bcrypt.js'
import logger from '../utils/logger.js'
import { tokenGenerate } from './jsonwebtoken.js'

const passCheck = (password) => {
    const min = 6
    if (password.length < 6) { return false }
    return true
}

passport.use('signin', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        const user = await usersDao.findByEmail(email)

        if (req.body.name === '') {
            const msg = `[USERS]: Signin fail, the name is missing`
            logger.warn(msg)
            return done(null, false, { message: msg })
        }

        if (req.body.lastname === '') {
            const msg = `[USERS]: Signin fail, the lastname is missing`
            logger.warn(msg)
            return done(null, false, { message: msg })
        }

        if (user) {
            const msg = `[USERS]: Signin fail, ${email} already exists`
            logger.warn(msg)
            return done(null, false, { message: msg })
        }

        if (req.body.password2 === undefined) { req.body.password2 = req.body.password }

        if (req.body.password != req.body.password2) {
            const msg = `[USERS]: Signin fail, passwords do not match`
            logger.warn(msg)
            return done(null, false, { message: msg })
        }

        if (!(passCheck(req.body.password))) {
            const msg = `[USERS]: Signin fail, the password must be at least 6 characters`
            logger.warn(msg)
            return done(null, false, { message: msg })
        }

        req.body.password = await encryptPassword(password)
        const nuevoUsuario = await usersDao.create(req.body)
        nuevoUsuario.token = tokenGenerate(nuevoUsuario._doc)
        const msg = `[USERS]: User ${email} signin susscefuly`
        logger.info(msg)
        // logger.info('[TOKEN]: ' + nuevoUsuario.token)
        return done(null, nuevoUsuario)
    }
))

passport.use('login', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        const user = await usersDao.findByEmail(email)
        if (!user) {
            const msg = `[USERS]: Login fail, user ${email} don't exist`
            logger.warn(msg)
            return done(null, false, { message: msg })
        }
        const isTruePassword = await comparePassword(password, user.password)
        if (!isTruePassword) {
            const msg = `[USERS]: Login fail, wrong password for user ${email}`
            logger.warn(msg)
            return done(null, false, { message: msg })
        }
        user.token = tokenGenerate(user)
        const msg = `[USERS]: User ${email} login susscefuly`
        logger.info(msg)
        // logger.info('[TOKEN]: ' + user.token)
        return done(null, user)
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await usersDao.get(id)
    if (user) {
        const { name, lastname, image, email } = user._doc

        done(null, {
            name,
            lastname,
            image,
            email
        })
    }
})