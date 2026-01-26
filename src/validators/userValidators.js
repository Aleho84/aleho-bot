import Joi from 'joi';

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'El email debe ser un correo válido',
        'any.required': 'El email es requerido'
    }),
    password: Joi.string().required().messages({
        'any.required': 'La contraseña es requerida'
    })
});

export const signinSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'El email debe ser un correo válido',
        'any.required': 'El email es requerido'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'La contraseña debe tener al menos 6 caracteres',
        'any.required': 'La contraseña es requerida'
    }),
    name: Joi.string().optional(),
    lastname: Joi.string().optional(),
    image: Joi.string().optional(),
    account: Joi.object().optional()
});

export const userIdSchema = Joi.object({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.pattern.base': 'El ID debe ser un ObjectId válido',
        'any.required': 'El ID es requerido'
    })
});
