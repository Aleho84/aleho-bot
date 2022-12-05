import { Router } from 'express'
import usersRouter from './usersRoutes.js'
import botCmdRouter from './botCmdRoutes.js'

const apiRouter = Router()

apiRouter.use('/users', usersRouter)
apiRouter.use('/botcmd', botCmdRouter)

export default apiRouter 