/**
 * @swagger
 * paths:
 *   /api/botcmd/findfreegames/:
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

/**
 * @swagger
 * paths:
 *   /api/botcmd/newfreegames/:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: New free game list.
 *       description: Show a list of new free games.
 *       operationId: "newfreegames"
 *       tags:
 *         - BotCmd
 *       produces:
 *         - application/json
 *       parameters: []
 *       responses:
 *         "200":
 *           description: OK. New free game list obtained.
 *         "500":
 *           description: Internal Server Error.
 */

/**
 * @swagger
 * paths:
 *   /api/botcmd/showlogs/:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: Bot logs.
 *       description: Show Bot logs.
 *       operationId: "showlogs"
 *       tags:
 *         - BotCmd
 *       produces:
 *         - application/json
 *       parameters: []
 *       responses:
 *         "200":
 *           description: OK. Bot logs obtained.
 *         "500":
 *           description: Internal Server Error.
 */

/**
 * @swagger
 * paths:
 *   /api/botcmd/dolarhoy/:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: Dolar & Euro price.
 *       description: Show Dolar & Euro price in Argentina market.
 *       operationId: "dolarhoy"
 *       tags:
 *         - BotCmd
 *       produces:
 *         - application/json
 *       parameters: []
 *       responses:
 *         "200":
 *           description: OK. Dolar & Euro price obtained.
 *         "500":
 *           description: Internal Server Error.
 */