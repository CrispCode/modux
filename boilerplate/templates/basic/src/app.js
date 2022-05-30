/* globals window, document */

'use strict'

import {
  Module,

  logger
} from '@crispcode/modux'

import { LayoutComponent } from './src/layout.js'

import './app.scss'

let initialize = () => {
  // Create application
  let app = new Module( 'app' )
  app
    .addDependency( 'layout', LayoutComponent )

  // Set logger debug mode
  logger.enabled( true )

  // Start application
  app.bootstrap( document.querySelector( 'body' ), 'layout' )
}

window.addEventListener( 'load', () => {
  initialize()
} )
