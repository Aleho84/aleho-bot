import logger from '../utils/logger.js';

export const validateRequest = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      const msg = `[VALIDATION]: Error de validación: ${error.details[0].message}`;
      logger.warn(msg);
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
};
