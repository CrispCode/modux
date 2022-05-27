'use strict'

import { uid, html } from './../../../../../scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  article1 () {
    let test = this._createTestElement( '<b>rnd</b> - Generates a random unique id' )

    // Step 1
    let s1 = uid()
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        'uid()',
        () => Promise.resolve( s1 ),
        () => Promise.resolve( s1 )
      )
    )

    // Step 2
    let s2 = uid()
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        'uid()',
        () => Promise.resolve( s2 ),
        () => Promise.resolve( s2 )
      )
    )

    // Step 3
    let s3 = uid()
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        'uid()',
        () => Promise.resolve( s3 ),
        () => Promise.resolve( s3 )
      )
    )

    return test
  }

  article2 () {
    let test = this._createTestElement( 'Test for yourself in the section below' )

    // Step 1
    let input = html( require( './test.html' ) )
    let output = html( '<span></span>' )

    input.querySelector( '.button-test' ).addEventListener( 'click', () => {
      try {
        output.innerHTML = uid()
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
