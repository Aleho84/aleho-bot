import { usersDao } from '../daos/index.js';
import { encryptPassword, comparePassword } from '../utils/bcrypt.js';
import { tokenGenerate } from '../config/jsonwebtoken.js';
import { generateCode, sendCodeValidatorMail } from '../utils/nodemailer.js';
import logger from '../utils/logger.js';

const checkPasswordLength = (password) => {
    return password.length >= 6;
};

export const createUser = async (userData) => {
    const { name, lastname, email, password, password2 } = userData;
    const pass2 = password2 || password;

    if (!name || name === '') {
        throw new Error('Error al registrar usuario, falta el nombre.');
    }
    if (!lastname || lastname === '') {
        throw new Error('Error al registrar usuario, falta el apellido.');
    }
    if (password !== pass2) {
        throw new Error('Error al registrar usuario, las contraseñas no coinciden.');
    }
    if (!checkPasswordLength(password)) {
        throw new Error('Error al registrar usuario, la contraseña debe tener al menos 6 carateres.');
    }

    const existingUser = await usersDao.findByEmail(email);
    if (existingUser) {
        throw new Error(`Error al registrar usuario, ${email} ya esta registrado.`);
    }

    const newUserData = { ...userData };
    newUserData.password = await encryptPassword(password);
    newUserData.account = {
        confirmed: false,
        code: generateCode(4),
        admin: false
    };

    // Remove password2 from object if exists
    delete newUserData.password2;

    const newUser = await usersDao.create(newUserData);
    newUser.token = tokenGenerate(newUser._doc);

    // Send email
    await sendCodeValidatorMail(newUser.email, newUser.name, newUser.account.code);

    return newUser;
};

export const loginUser = async (email, password) => {
    const user = await usersDao.findByEmail(email);
    if (!user) {
        throw new Error(`Login fail, el usuario ${email} no existe.`);
    }

    const isTruePassword = await comparePassword(password, user.password);
    if (!isTruePassword) {
        throw new Error(`Login fail, contraseña incorrecta para el usuario ${email}`);
    }

    user.token = tokenGenerate(user);
    return user;
};

export const deleteUser = async (id) => {
    return await usersDao.delete(id);
};

export const getUserById = async (id) => {
    return await usersDao.get(id);
};

export const getUserByEmail = async (email) => {
    return await usersDao.findByEmail(email);
};
