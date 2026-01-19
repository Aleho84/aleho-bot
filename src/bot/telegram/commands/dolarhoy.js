import logger from '../../../utils/logger.js';
import { getDolarInfo } from '../../../services/currencyService.js';

export const dolarhoy = async (bot, chatUser) => {
    try {
        const { content, success } = await getDolarInfo();

        if (!success) {
            bot.sendMessage(chatUser.chatID, content);
            return false;
        }

        bot.sendMessage(chatUser.chatID, content);
        return true;
    } catch (error) {
        logger.error(`[TELEGRAM BOT]: ${error.name}: ${error.message}. ${error.stack}`);
        return false;
    }
};