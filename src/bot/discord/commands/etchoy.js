import { codeBlock } from 'discord.js';
import logger from '../../../utils/logger.js';
import { getEthInfo } from '../../../services/currencyService.js';

export const etchoy = async (interaction) => {
    try {
        const { data, content, success } = await getEthInfo();

        if (!success) {
            interaction.reply({ content: content });
            return false;
        }

        const msg = `
        Etherium 💹
        
        Exchange      Precio
        -------------------------
        letsbit       u${data.valores[0].toFixed(2)}
        binancep2p    u${data.valores[1].toFixed(2)}
        tiendacrypto  u${data.valores[2].toFixed(2)}
        fiwind        u${data.valores[3].toFixed(2)}
        bitsoalpha    u${data.valores[4].toFixed(2)}
        -------------------------
        Promedio      u${data.promedio.toFixed(2)}
        `;
        interaction.reply({ content: codeBlock(msg) });
        return true;
    } catch (error) {
        logger.error(`[DISCORD BOT]: ${error.name}: ${error.message}. ${error.stack}`);
        return false;
    }
};