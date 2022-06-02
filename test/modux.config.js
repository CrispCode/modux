'use strict'

module.exports = ( config ) => {
  // Enable logging in webpack
  config.stats = 'normal'

  config.devServer.setupMiddlewares = ( middlewares, server ) => {
    let app = server.app
    app.post( '/what-did-i-send', ( req, res ) => {
      const chunks = []
      req.on( 'data', chunk => chunks.push( chunk ) )
      req.on( 'end', () => {
        const data = Buffer.concat( chunks ).toString()

        let boundry = data.split( '\n' )[ 0 ]
        let rawParams = data.split( boundry )
        let result = {}
        for ( let i = 1; i < rawParams.length; i++ ) {
          let match = rawParams[ i ].match( new RegExp( ';\\sname="(.*)?"(\\r\\n){2}?(.*)?', 'i' ) )
          result[ match[ 1 ] ] = match[ 3 ]
        }

        res.end( JSON.stringify( result ) )
      } )
    } )

    return middlewares
  }

  return config
}
