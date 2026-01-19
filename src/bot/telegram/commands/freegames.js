import logger from '../../../utils/logger.js';
import { getFreeGamesInfo } from '../../../services/gamesService.js';

export const freegames = async (bot, chatUser) => {
    try {
        const { data, content, success } = await getFreeGamesInfo();

        if (!success) {
            bot.sendMessage(chatUser.chatID, content);
            return false;
        }

        if (data.length === 0) {
            bot.sendMessage(chatUser.chatID, 'No encontré ningun juego gratis 😔');
        } else {
            const messages = data.map(game => `${game.title}:\n\n Tipo: ${game.type}\n Plataforma: ${game.platforms}\n Finaliza: ${game.end_date}\n\n Instrucciones:\n${game.instructions}\n\n ${game.open_giveaway_url}`);
            await Promise.all(messages.map(msg => bot.sendMessage(chatUser.chatID, msg)));
        }
        return true;
    } catch (error) {
        logger.error(`[TELEGRAM BOT]: ${error.name}: ${error.message}. ${error.stack}`);
        return false;
    }
};
