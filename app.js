'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');

const cookiePostParamHandler = function (request, h) {
    if (request.method == "post") {
        const cookieRegex = "^cookie_";
        for(const k in request.payload) {
            if (k.match(cookieRegex)) {
                const cookieName = k.replace(cookieRegex,"")
                const cookieValue = request.payload[k]
                request.log(['debug'], `Setting ${cookieName} to ${cookieValue}.`);
                h.state(cookieName,cookieValue)
            }
        }
        return h.redirect(request.url).takeover()
    }
    return h.continue;
};

const start = async () => {

    const server = Hapi.server({
        host: 'localhost',
        port: 3000,
        debug: {
            request: '*',
            log: '*'
        },
        routes: {
            log: {
                collect: true
            },
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
            pre: [cookiePostParamHandler],
        },
        handler: {
            directory: {
                path: Path.join(__dirname, 'static'),
                listing: true,
            }
        }
    });

    server.events.on('log', (event, tags) => {
        console.log("log: "+event);
    });

    server.events.on('request', (event, tags) => {
        console.log("request: "+event);
    });
    await server.start();

    console.log('Server running at:', server.info.uri);
};

start();
