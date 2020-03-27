'use strict';

exports.Handler = function (
    cookieOptions = {},
    cookieRegex = "^cookie_",
    redirect = true) {
    return function(
        cookieOptions,
        cookieRegex,
        redirect,
        request,
        h ) {
        if (request.method == "post") {
            for(const k in request.payload) {
                if (k.match(cookieRegex)) {
                    const cookieName = k.replace(cookieRegex,"")
                    const cookieValue = request.payload[k]
                    h.state(cookieName,cookieValue, cookieOptions)
                }
            }
            if(redirect) {
                return h.redirect(request.url).takeover()
            }
        }
        return h.continue;
    }.bind(undefined, cookieOptions,  cookieRegex, redirect);
};


