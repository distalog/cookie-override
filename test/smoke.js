/* eslint-env node, es2017 */
'use strict';
const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const Hapi = require('@hapi/hapi');
const Path = require('path');
const cookieParamHandler = require("..").Handler;
const fs = require("fs")
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
            }
        }
    });
    await server.start();
    let response = await server.inject({
        "method": "POST",
        "url": `${server.info.uri}/form.html`,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "payload": "cookie_css_consent=foo"
    })
    expect(response.statusCode).to.equal(302)
    expect(response.headers["set-cookie"][0]).to.equal("css_consent=foo; Secure; HttpOnly; SameSite=Strict")
    let redirectedResponse = await server.inject({
        "method": "GET",
        "url": response.headers.location,
    })
    const htmlForm = fs.readFileSync(Path.join(__dirname,"static","form.html")).toString()
    expect(redirectedResponse.statusCode).to.equal(200)
    expect(redirectedResponse.payload).to.equal(htmlForm)
});