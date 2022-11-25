import { Router } from 'express'
import { auth } from '../config/jsonwebtoken.js'

const gameListRouter = Router()

import {
    freeGames
} from '../controllers/botCmdController.js'

gameListRouter.get('/freegames', auth, freeGames)

export default gameListRouter