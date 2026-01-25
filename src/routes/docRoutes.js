import 'dotenv/config';
import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import readJson from "../utils/readJson.js";
import path from 'path';
import constant from '../config/constant.js';

const packageJson = readJson();

const protocol = constant.HOST.includes('sytes.net') ? 'https' : constant.PROTOCOL;
const port = constant.HOST.includes('sytes.net') ? '' : ':' + constant.PORT;
const SERVER_SWAGGER = `${protocol}://${constant.HOST}${port}`;
const swaggerApp = express();

// Swagger 
const swaggerOptions = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: packageJson.name.toUpperCase(),
            version: packageJson.version,
            description: `DOCUMENTACION - ${packageJson.description}`,
            contact: {
                name: packageJson.author.name,
                email: packageJson.author.email,
                url: packageJson.author.url
            }
        },
        servers: [{ url: SERVER_SWAGGER }]
    },
    apis: [
        path.join(constant.__dirname, '../doc/swagger/swagger-tags.js'),
        path.join(constant.__dirname, '../doc/swagger/swagger-models.js'),
        path.join(constant.__dirname, '../doc/swagger/doc-users.js'),
        path.join(constant.__dirname, '../doc/swagger/doc-botCmd.js')
    ]
};

const swaggerUIOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: packageJson.name,
    customfavIcon: "/ico/favicon.ico"
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
swaggerApp.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs, swaggerUIOptions));

export default swaggerApp;