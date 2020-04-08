/* eslint-env node, es2017 */
'use strict';
const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const Hapi = require('@hapi/hapi');
const Path = require('path');
const cookieParamHandler = require("..").Handler;

const { expect } = Code;
const lab = exports.lab = Lab.script();



lab.test('sets cookie on call', async () => {

    const server = Hapi.server({
        routes: {
            files: {
                relativeTo: "/"
            }
        }
    });

    await server.register(require('@hapi/inert'));

    server.route({
        method: '*',
        path: '/{param?}',
        options: {
            pre: [cookieParamHandler()]
        },
        handler: {
            directory: {
                path: Path.join(__dirname, 'static'),
                listing: true
            }
        }
    });
    await server.start();
});