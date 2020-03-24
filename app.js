var Hapi = require('@hapi/hapi')

// create a server with a host and port
var server = new Hapi.Server({
  host: 'localhost',
  port: 3000
})

// add “hello world” route
server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'Hello Future Studio!'
  }
})

async function start () {
  // start your server
  try {
    await server.start()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  console.log('Server running at: ', server.info.uri)
}

start()
