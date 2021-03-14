/* globals window, document */

'use strict'

import { Module, logger } from './../../scripts'

import { Layout } from './components/layout'

let initialize = () => {
  // Create application
  let app = new Module( 'app' )
  app
    .addDependency( 'layout', Layout )

  app.store.set( 'core', window.config )

  logger.enabled( app.store.get( 'core.debug' ) )

  logger.info( 'Application start' )

  // Start application
  app.bootstrap( document.querySelector( 'body' ), 'layout' )
}

window.addEventListener( 'load', () => {
  initialize()
} )
