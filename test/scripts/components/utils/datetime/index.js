'use strict'

import { DateTime, html } from './../../../../../src/scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  article1 () {
    let test = this._createTestElement( '<b>DateTime</b> - A wrapper for the Date() class' )

    // Step 1
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `new DateTime( 'December 17, 1995 03:24:00' ).toString()`,
        () => Promise.resolve( ( new DateTime( 'December 17, 1995 03:24:00' ) ).toString() ),
        () => Promise.resolve( '1995-12-17 03:24:00' )
      )
    )

    // Step 2
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `new DateTime( '1970-01-02' ).getTime()`,
        () => {
          let time = new DateTime( '1970-01-02' ).getTime()
          return Promise.resolve( time )
        },
        () => Promise.resolve( new Date( '1970-01-02' ).getTime() )
      )
    )

    // Step 3
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `new DateTime( '1995-12-17T03:24:00' ).toTime()`,
        () => Promise.resolve( new DateTime( '1995-12-17T03:24:00' ).toTime() ),
        () => Promise.resolve( '03:24:00.000' )
      )
    )

    // Step 4
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `new DateTime( 'Sat Jan 26 2019 15:55:48' ).toDate()`,
        () => Promise.resolve( new DateTime( 'Sat Jan 26 2019 15:55:48' ).toDate() ),
        () => Promise.resolve( '2019-01-26' )
      )
    )

    // Step 4
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `new DateTime( '1970-01-01' ).elapsedTime()`,
        () => Promise.resolve( new DateTime( '1970-01-01' ).elapsedTime() ),
        () => Promise.resolve( new Date() - new Date( '1970-01-01' ) )
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
      let parameter = input.querySelector( '.input-test-parameter' ).value
      let method = input.querySelector( '.input-test-method' ).value
      try {
        output.innerHTML = new DateTime( parameter )[ method ]()
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
