import logger from '../utils/logger.js';
import os from 'os';
import { secondsToString, bytesToMegabytes } from '../utils/functions.js';

export const getServerStatusInfo = () => {
    try {
        const uptime = secondsToString(os.uptime());
        const freeMemory = parseInt(bytesToMegabytes(os.freemem()));
        const totalMemory = parseInt(bytesToMegabytes(os.totalmem()));
        const message = ['ALEHO-SERVER STATUS:', '', `💻  Online for ${uptime}`, `🧮  Free memory: ${freeMemory} MB`, `🧮  Total memory: ${totalMemory} MB`].join('\n');
        return { content: message, success: true };
    } catch (error) {
        logger.error(`[SERVER SERVICE]: ${error.name}: ${error.message}. ${error.stack}`);
        return { content: '🤯 Hay problemas técnicos, volvé a intentarlo mas tarde', success: false };
    }
};