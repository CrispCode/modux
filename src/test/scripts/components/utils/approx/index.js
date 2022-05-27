'use strict'

import { approx, html } from './../../../../../scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  article1 () {
    let test = this._createTestElement( '<b>approx</b> - A function used to approximate any numeric representation to a specific number of decimals' )

    // Step 1
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        'approx( 123.98765, 3 )',
        () => Promise.resolve( approx( 123.98765, 3 ) ),
        () => Promise.resolve( 123.988 )
      )
    )

    // Step 2
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        'approx( Math.PI, 6 )',
        () => Promise.resolve( approx( Math.PI, 6 ) ),
        () => Promise.resolve( 3.141593 )
      )
    )

    // Step 3
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        'approx( 0.0909 / 123123, 6 )',
        () => Promise.resolve( approx( 0.0909 / 123123, 6 ) ),
        () => Promise.resolve( 0.000001 )
      )
    )

    // Step 4
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        'approx( -1.1e+3 / 2.2e-1, 2 )',
        () => Promise.resolve( approx( -1.1e+3 / 2.2e-1, 2 ) ),
        () => Promise.resolve( -5000.00 )
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
      let value = input.querySelector( '.input-test-value' ).value
      let decimals = input.querySelector( '.input-test-decimals' ).value
      try {
        output.innerHTML = approx( value, decimals )
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
