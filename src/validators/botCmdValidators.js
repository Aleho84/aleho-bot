import Joi from 'joi';

export const newFreeGamesSchema = Joi.object({
    id: Joi.string().required().messages({
        'any.required': 'El ID del canal/parametro es requerido'
    })
});
