import logger from '../../../utils/logger.js';
import { getEuroInfo } from '../../../services/currencyService.js';

export const eurohoy = async (interaction) => {
    try {
        const { content, success } = await getEuroInfo();

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