import logger from '../utils/logger.js'
// import { botCmdDao } from '../daos/index.js'
import { findFreeGames } from '../utils/functions.js'

export const freeGames = (req, res) => {
  try {
    findFreeGames()
      .then(gameList => {
        res.status(200).send(gameList)
      })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ message: err.message, line: err.line })
  }
}