'use strict'

import { sounds, html } from './../../../../../scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  article1 () {
    return this._createTestElement( '<b>sounds</b> - A small library used to play sounds' )
  }

  article2 () {
    let test = this._createTestElement( 'Play a short sound' )

    // Step 1
    let input = html( require( './test.html' ) )
    let output = html( '<span></span>' )

    input.querySelector( '.button-test' ).addEventListener( 'click', () => {
      try {
        sounds.enable( true )
        sounds.add( 'ding', '/ding.wav' )
        sounds.get( 'ding' ).play()
          .then( () => {
            output.innerHTML = 'Played ding.wav'
          } )
      } catch ( e ) {
        output.innerHTML = e.message
      }
    } )

    let step = this._createStepElement( input, output )
    test.querySelector( '.steps' ).appendChild( step )

    return test
  }

  execute () {
    this.element.appendChild( this.article1() )
    this.element.appendChild( this.article2() )
  }
}
