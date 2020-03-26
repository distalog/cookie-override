'use strict';

exports.cookieParamHandler = function (cookieRegex = "^cookie_", redirect = true) {
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


