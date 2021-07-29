'use strict'

import { Component, html } from './../../../../scripts'

const template = require( './template.html' )

const test = require( './test.html' )
const step = require( './step.html' )

import './../../../styles/components/utils.scss'

export class Utils extends Component {
  get template () {
    return template
  }

  _createStep ( input, promiseExec, promiseResult ) {
    let step = this._createStepElement( html( '<span>' + input + '</span>' ), html( 'running...' ) )
    let output = step.querySelector( '.output' )
    Promise.all( [ promiseExec( step.querySelector( '.process' ) ), promiseResult() ] )
      .then( ( values ) => {
        output.innerHTML = values[ 0 ]
        if ( values[ 0 ] === values[ 1 ] ) {
          output.className = 'output true'
        } else {
          output.className = 'output false'
        }
      } )
      .catch( ( err ) => {
        output.innerHTML = err.message
        output.className = 'output false'
      } )
    return step
  }

  _createStepElement ( htmlTest, htmlOutput ) {
    let tmpl = html( step )
    tmpl.querySelector( '.test' ).appendChild( htmlTest )
    tmpl.querySelector( '.output' ).appendChild( htmlOutput )
    return tmpl
  }

  _createTestElement ( description ) {
    let tmpl = html( test )
    tmpl.querySelector( '.description' ).innerHTML = description
    return tmpl
  }
}
