import logger from '../../../utils/logger.js';
import { getBtcInfo } from '../../../services/currencyService.js';

export const btchoy = async (bot, chatUser) => {
    try {
        const { data, content, success } = await getBtcInfo();

        if (!success) {
            bot.sendMessage(chatUser.chatID, content);
            return false;
        }

        const msg = `
          <b>Bitcoin 💹</b>
          <b></b>
          <code> Exchange      Precio </code>
          <code> ------------------------</code>
          <code> Letsbit        u${data.valores[0].toFixed(2)} </code>
          <code> Binancep2p     u${data.valores[1].toFixed(2)} </code>
          <code> Tiendacrypto   u${data.valores[2].toFixed(2)} </code>
          <code> Fiwind         u${data.valores[3].toFixed(2)} </code>
          <code> Bitsoalpha     u${data.valores[4].toFixed(2)} </code>
          <code> ------------------------</code>
          <code> Promedio       u${data.promedio.toFixed(2)} </code>
          <b></b>
          `;

        bot.sendMessage(chatUser.chatID, msg, { parse_mode: "HTML" });
        return true;
    } catch (error) {
        logger.error(`[TELEGRAM BOT]: ${error.name}: ${error.message}. ${error.stack}`);
        return false;
    }
};