## cookie-param-handler

[hapi](https://github.com/hapijs/hapi) handler to allow static contents to set cookies by passing them as form fields.

Use it as a `pre` handler on top of the actual static content.

See code in the [example](example) directory for usage.

Used by [cookie-css](https://github.com/distalog/cookie-css) for instance.

### Security

Be aware that this handler allows setting arbitrary cookies: consider
putting it behind authentication.
