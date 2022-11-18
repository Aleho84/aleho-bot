/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT*
 *
 *   schemas:
 * 
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Pepe
 *         lastname:
 *           type: string
 *           example: Argento
 *         email:
 *           type: string
 *           example: pepeargento@mail.com
 *         password:
 *           type: string
 *           example: fatiga
 *         image:
 *           type: string
 *           example: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSgWSWOqeAoLAfMlbBBg8IN-v2x5IGAfbuSg&usqp=CAU
 * 
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: pepeargento@mail.com
 *         password:
 *           type: string
 *           example: fatiga 
 * 
 */