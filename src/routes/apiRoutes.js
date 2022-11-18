import { Router } from 'express'
import usersRouter from './usersRoutes.js'

const apiRouter = Router()

apiRouter.use('/users', usersRouter)

export default apiRouter 