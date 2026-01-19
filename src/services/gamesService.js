import logger from '../utils/logger.js';
import { findFreeGamesFunction } from '../utils/games.js';

export const getFreeGamesInfo = async () => {
    try {
        const { data, status, error } = await findFreeGamesFunction();

        if (error) {
            logger.error(`[GAMES SERVICE]: ${error.name}: ${error.message}. ${error.stack}`);
            return { content: '🤯 Hay problemas técnicos, volvé a intentarlo mas tarde', success: false };
        }

        if (status !== 200) {
            logger.error(`[GAMES SERVICE]: la funcion "findFreeGamesFunction" devolvio un status code diferente a 200`);
            return { content: '🤯 Hay problemas técnicos, volvé a intentarlo mas tarde', success: false };
        }

        if (data.length === 0) {
            return { content: 'No encontré ningun juego gratis 😔', success: true, data: [] };
        }

        return { data: data, success: true };
    } catch (error) {
        logger.error(`[GAMES SERVICE]: ${error.name}: ${error.message}. ${error.stack}`);
        return { content: '🤯 Hay problemas técnicos, volvé a intentarlo mas tarde', success: false };
    }
};