import logger from '../../../utils/logger.js';
import { getServerStatusInfo } from '../../../services/serverService.js';

export const serverstatus = async (bot, chatUser) => {
    try {
        if (!chatUser.admin) {
            bot.sendMessage(chatUser.chatID, `Y a vos quien te conoce? no te puedo dar esa informacion, es solo para un admin.`);
            return true;
        }

        const { content, success } = getServerStatusInfo();

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