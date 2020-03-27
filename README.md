## cookie-param-handler

[hapi](https://github.com/hapijs/hapi) handler to allow static contents to set cookies by passing them as form fields.

See code in the [example](example) directory for usage.

Used by [cookie-css](distalog/cookie-css) for instance.

### Security

Be aware that this handler allows setting arbitrary cookies: consider
putting it behind authentication.
