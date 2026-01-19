import { generatePassword } from '../utils/functions.js';
import logger from '../utils/logger.js';

export const getGeneratedPassword = () => {
    try {
        const password = generatePassword(16);
        return { password: password, success: true };
    } catch (error) {
        logger.error(`[PASSWORD SERVICE]: ${error.name}: ${error.message}. ${error.stack}`);
        return { content: '🤯 Hay problemas técnicos, volvé a intentarlo mas tarde', success: false };
    }
};