# Mock apis

#### /modux.config.js

```js

'use strict'

module.exports = ( config ) => {
  config.devServer.setupMiddlewares = ( middlewares, server ) => {
    let app = server.app
    app.get( '/qq', ( req, res ) => {
      res.end( 'THE END' )
    } )
    return middlewares
  }

  return config
}

```