import logger from '../../../utils/logger.js';
import { getServerStatusInfo } from '../../../services/serverService.js';

export const serverstatus = async (interaction) => {
    try {
        const { content, success } = getServerStatusInfo();

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