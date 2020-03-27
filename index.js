'use strict';

exports.Handler = function (cookieRegex = "^cookie_",
                            cookieOptions = {},
                            redirect = true) {
    return function( cookieRegex,
                     cookieOptions,
                     redirect,
                     request,
                     h ) {
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
    }.bind(undefined, cookieRegex, cookieOptions, redirect);
};


