import logger from '../../../utils/logger.js';
import { getHelpInfo } from '../../../services/helpService.js';

export const commandInfo = [
    { command: 'start', description: 'Activa el bot.' },
    { command: 'stop', description: 'Desactiva el bot.' },
    ...getHelpInfo().map(cmd => ({ command: cmd.name, description: cmd.description })),
    { command: 'resetcontext', description: 'Resetea el contexto de la charla con Aleho-Bot.' }
];

export const help = async (bot, chatUser) => {
    try {
        const helpTitle = [`-- Ayuda 📜 -- \n`];
        const helpContent = commandInfo.map(command => `${command.command} : ${command.description}`);
        const helpMessage = helpTitle.concat(helpContent).join('\n');
        
        bot.sendMessage(chatUser.chatID, helpMessage);
        return true;
    } catch (error) {
        logger.error(`[TELEGRAM BOT]: ${error.name}: ${error.message}. ${error.stack}`);
        return false;
    }
};