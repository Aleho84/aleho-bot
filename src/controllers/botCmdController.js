import logger from '../utils/logger.js'
import {
  findFreeGamesFunction,
  newFreeGamesFunction,
  showLogsFunction
} from '../utils/functions.js'

export const findFreeGames = (req, res) => {
  try {
    findFreeGamesFunction()
      .then(gameList => {
        res.status(200).send(gameList)
      })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ message: err.message, line: err.line })
  }
}

export const newFreeGames = (req, res) => {
  try {
    newFreeGamesFunction()
      .then(newGameList => {
        res.status(200).send(newGameList)
      })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ message: err.message, line: err.line })
  }
}

export const showLogs = (req, res) => {
  try {
    showLogsFunction()
      .then(logList => {
        res.status(200).send(logList)
      })
  } catch (err) {
    logger.error(err)
    res.status(500).json({ message: err.message, line: err.line })
  }
}
