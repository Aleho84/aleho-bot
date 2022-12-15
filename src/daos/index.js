import { DB_MODE } from '../config/constant.js'
import logger from '../utils/logger.js'
import 'dotenv/config'

let usersDao
let gamesDao

switch (DB_MODE) {
  case 'mongoDB': //importa el modelo para usar mongodb
    import('./mongoDBUsers.js').then(({ MongoDBUsers }) => { usersDao = new MongoDBUsers() })
    import('./mongoDBGames.js').then(({ MongoDBGames }) => { gamesDao = new MongoDBGames() })
    break

  default:
    const errMsg = '[SERVER]: ❌ DB_MODE not defined'
    logger.error(errMsg)
    throw new Error(errMsg)
    break
}

export {
  usersDao,
  gamesDao
}