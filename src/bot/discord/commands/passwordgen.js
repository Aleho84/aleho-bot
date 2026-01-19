import logger from '../../../utils/logger.js';
import { getGeneratedPassword } from '../../../services/passwordService.js';

export const passwordgen = async (interaction) => {
    try {
        const { password, content, success } = getGeneratedPassword();

        if (!success) {
            interaction.reply({ content: content });
            return false;
        }

        interaction.reply({ content: password });
        return true;
    } catch (error) {
        logger.error(`[DISCORD BOT]: ${error.name}: ${error.message}. ${error.stack}`);
        return false;
    }
};