'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');

const cookiePostHandler = function (cookieRegex = "^cookie_", redirect = true) {
    return function( cookieRegex, redirect, request, h ) {
        if (request.method == "post") {
            for(const k in request.payload) {
                if (k.match(cookieRegex)) {
                    const cookieName = k.replace(cookieRegex,"")
                    const cookieValue = request.payload[k]
                    h.state(cookieName,cookieValue)
                }
            }
            if(redirect) {
                return h.redirect(request.url).takeover()
            }
        }
        return h.continue;
    }.bind(undefined, cookieRegex, redirect);
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
            pre: [cookiePostHandler()],
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
