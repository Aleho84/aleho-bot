import { Router } from 'express'
import { auth } from '../config/jsonwebtoken.js'

const gameListRouter = Router()

import {
    findFreeGames,
    newFreeGames,
    showLogs
} from '../controllers/botCmdController.js'

gameListRouter.get('/findfreegames', auth, findFreeGames)
gameListRouter.get('/newfreegames', auth, newFreeGames)
gameListRouter.get('/showlogs', showLogs)

export default gameListRouter