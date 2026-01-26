import { Router } from 'express';
import { auth, isAdmin } from '../config/jsonwebtoken.js';
import { validateRequest } from '../middlewares/validationMiddleware.js';
import { newFreeGamesSchema } from '../validators/botCmdValidators.js';

const botCmdRouter = Router();

import {
    findFreeGames,
    newFreeGames,
    showLogs,
    dolarHoy,
    euroHoy,
    clearLogs,
    serverCheck
} from '../controllers/botCmdController.js';

botCmdRouter.get('/findfreegames', auth, findFreeGames);
botCmdRouter.get('/newfreegames/:id', auth, validateRequest(newFreeGamesSchema, 'params'), newFreeGames);
botCmdRouter.get('/showlogs', auth, isAdmin, showLogs);
botCmdRouter.get('/dolarhoy', auth, dolarHoy);
botCmdRouter.get('/eurohoy', auth, euroHoy);
botCmdRouter.get('/claerlogs', auth, isAdmin, clearLogs);
botCmdRouter.get('/servercheck', serverCheck);

export default botCmdRouter;