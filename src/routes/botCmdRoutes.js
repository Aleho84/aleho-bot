import { Router } from 'express'
import { auth } from '../config/jsonwebtoken.js'

const gameListRouter = Router()

import {
    findFreeGames,
    newFreeGames
} from '../controllers/botCmdController.js'

gameListRouter.get('/findfreegames', auth, findFreeGames)
gameListRouter.get('/newfreegames', auth, newFreeGames)

export default gameListRouter