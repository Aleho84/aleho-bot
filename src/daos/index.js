import 'dotenv/config';
import logger from '../utils/logger.js';
import constant from '../config/constant.js';

let logsDao;
let usersDao;
let gamesDao;
let telegramUsersDao;
let dolarBlueHistoryDao;

switch (constant.DB_MODE) {
  case 'mongoDB': //importa el modelo para usar mongodb
    const { MongoDBLogs } = await import('./mongoDBLogs.js');
    logsDao = new MongoDBLogs();
    const { MongoDBUsers } = await import('./mongoDBUsers.js');
    usersDao = new MongoDBUsers();
    const { MongoDBGames } = await import('./mongoDBGames.js');
    gamesDao = new MongoDBGames();
    const { MongoDBTelegramUsers } = await import('./mongoDBTelegramUsers.js');
    telegramUsersDao = new MongoDBTelegramUsers();
    const { MongoDBDolarBlueHistory } = await import('./mongoDBDolarBlueHistory.js');
    dolarBlueHistoryDao = new MongoDBDolarBlueHistory();
    break;

  default:
    logger.error('[SERVER]: ❌ DB_MODE no definido.');
    process.exit(1);
};

export {
  logsDao,
  usersDao,
  gamesDao,
  telegramUsersDao,
  dolarBlueHistoryDao
};