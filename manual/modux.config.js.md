# Mock apis

#### /modux.config.js

```js

'use strict'

module.exports = ( config ) => {
  config.devServer.onBeforeSetupMiddleware = ( server ) => {
    let app = server.app
    app.get( '/qq', ( req, res ) => {
      res.end( 'THE END' )
    } )
  }

  return config
}

```