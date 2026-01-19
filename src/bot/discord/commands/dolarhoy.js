import logger from '../../../utils/logger.js';
import { getDolarInfo } from '../../../services/currencyService.js';

export const dolarhoy = async (interaction) => {
    try {
        const { content, success } = await getDolarInfo();

        if (!success) {
            interaction.reply({ content: content });
            return false;
        }

        interaction.reply({ content: content });
        return true;
    } catch (error) {
        logger.error(`[DISCORD BOT]: ${error.name}: ${error.message}. ${error.stack}`);
        return false;
    }
};