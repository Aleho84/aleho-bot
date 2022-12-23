import { Router } from 'express'
import { auth } from '../config/jsonwebtoken.js'

const botCmdRouter = Router()

import {
    findFreeGames,
    newFreeGames,
    showLogs,
    dolarHoy
} from '../controllers/botCmdController.js'

botCmdRouter.get('/findfreegames', auth, findFreeGames)
botCmdRouter.get('/newfreegames', auth, newFreeGames)
botCmdRouter.get('/showlogs', auth, showLogs)
botCmdRouter.get('/showlogs', auth, showLogs)
botCmdRouter.get('/dolarhoy', auth, dolarHoy)

export default botCmdRouter