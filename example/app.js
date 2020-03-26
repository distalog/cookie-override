'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');
const cookieParamHandler = require("../cookie-param-handler").cookieParamHandler

const start = async () => {

    const server = Hapi.server({
        host: 'localhost',
        port: 3000,
        routes: {
            files: {
                relativeTo: "/",
            },
        }
    });

    await server.register(require('@hapi/inert'));

    server.route({
        method: '*',
        path: '/{param?}',
        options: {
            pre: [cookieParamHandler()],
        },
        handler: {
            directory: {
                path: Path.join(__dirname, 'static'),
                listing: true,
            }
        }
    });
    await server.start();
    console.log('Server running at:', server.info.uri);
};

start();
