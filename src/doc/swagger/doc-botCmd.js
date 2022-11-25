/**
 * @swagger
 * paths:
 *   /api/botcmd/freegames/:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: Free game list.
 *       description: Show a list of active free games.
 *       operationId: "freegames"
 *       tags:
 *         - BotCmd
 *       produces:
 *         - application/json
 *       parameters: []
 *       responses:
 *         "200":
 *           description: OK. Free game list obtained.
 *         "500":
 *           description: Internal Server Error.
 */