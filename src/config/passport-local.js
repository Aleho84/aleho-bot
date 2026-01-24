import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import * as usersService from '../services/usersService.js';
import logger from '../utils/logger.js';

passport.use('signin', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        try {
            req.session.body = req.body;
            req.session.error = '';
            req.session.msg = '';

            const newUser = await usersService.createUser({ ...req.body, email, password });

            const msg = `[USERS]: User ${email} signin susscefuly`;
            req.msg = 'Se envió un codigo de validacion a su cuenta de correo, la proxima vez que inicie sesion deberá ingresar el codigo enviado.';
            logger.info(msg);

            return done(null, newUser, { msg: req.msg });
        } catch (error) {
            logger.warn(`[USERS]: ${error.message}`);
            req.session.error = error.message;
            return done(null, false, { message: error.message });
        }
    }
));

passport.use('login', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        try {
            const user = await usersService.loginUser(email, password);
            const msg = `[USERS]: User ${email} login exitoso`;
            logger.info(msg);
            return done(null, user);
        } catch (error) {
            logger.warn(`[USERS]: ${error.message}`);
            return done(null, false, { message: error.message });
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await usersService.getUserById(id);
        if (user) {
            const { name, image, email, account: { admin } } = user._doc;
            done(null, {
                name,
                image,
                email,
                admin
            });
        } else {
            done(null, false);
        }
    } catch (error) {
        done(error);
    }
});