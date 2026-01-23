import logger from './logger.js';
import constant from '../config/constant.js';

const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    // Log the error
    logger.error(`[ERROR]: ${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    if (constant.NODE_ENV === 'development') {
        logger.error(err.stack);
    }

    // Response based on environment
    if (constant.NODE_ENV === 'development') {
        res.status(statusCode).json({
            status: 'error',
            statusCode,
            message: message,
            stack: err.stack,
            line: err.line // Custom property used in some controllers
        });
    } else {
        // Production: Generic message
        res.status(statusCode).json({
            status: 'error',
            statusCode,
            message: statusCode === 500 ? 'Internal Server Error' : message
        });
    }
};

export default errorHandler;
