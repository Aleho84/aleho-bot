import logger from '../../../utils/logger.js';
import { getGeneratedPassword } from '../../../services/passwordService.js';

export const passwordgen = async (bot, chatUser) => {
    try {
        const { password, content, success } = getGeneratedPassword();

        if (!success) {
            bot.sendMessage(chatUser.chatID, content);
            return false;
        }

        bot.sendMessage(chatUser.chatID, password);
        return true;
    } catch (error) {
        logger.error(`[TELEGRAM BOT]: ${error.name}: ${error.message}. ${error.stack}`);
        return false;
    }
};