'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');

const start = async () => {

    const server = Hapi.server();

    await server.register(require('@hapi/inert'));

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: Path.join(__dirname, 'static'),
                listing: true
            }
        }
    });

    await server.start();

    console.log('Server running at:', server.info.uri);
};

start();
