'use strict'

import { rnd, html } from './../../../../../src/scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  article1 () {
    let test = this._createTestElement( '<b>rnd</b> - Generates a random integer number between two values' )

    // Step 1
    let s1 = rnd( 0, 1 )
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        'rnd( 0, 1 )',
        () => Promise.resolve( s1.toString() ),
        () => new Promise( ( resolve ) => {
          let value = s1
          if ( value >= 0 && value <= 1 ) {
            resolve( value.toString() )
          } else {
            resolve( 'wrong value' )
          }
        } )
      )
    )

    // Step 2
    let s2 = rnd( 10, 20 )
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        'rnd( 10, 20 )',
        () => Promise.resolve( s2.toString() ),
        () => new Promise( ( resolve ) => {
          let value = s2
          if ( value >= 10 && value <= 20 ) {
            resolve( value.toString() )
          } else {
            resolve( 'wrong value' )
          }
        } )
      )
    )

    // Step 3
    let s3 = rnd( 0.5, 2.5 )
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        'rnd( 0.5, 2.5 )',
        () => Promise.resolve( s3.toString() ),
        () => new Promise( ( resolve ) => {
          let value = s3
          if ( value >= 0.5 && value <= 2.5 ) {
            resolve( value.toString() )
          } else {
            resolve( 'wrong value' )
          }
        } )
      )
    )

    // Step 4
    let s4 = rnd( -2.5, 2.5 )
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        'rnd( -2.5, 2.5 )',
        () => Promise.resolve( s4.toString() ),
        () => new Promise( ( resolve ) => {
          let value = s4
          if ( value >= -2.5 && value <= 2.5 ) {
            resolve( value.toString() )
          } else {
            resolve( 'wrong value' )
          }
        } )
      )
    )

    // Step 5
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        'rnd( 1, 1 )',
        () => Promise.resolve( rnd( 1, 1 ).toString() ),
        () => new Promise( ( resolve ) => {
          let value = rnd( 1, 1 )
          if ( value >= 1 && value <= 1 ) {
            resolve( value.toString() )
          } else {
            resolve( 'wrong value' )
          }
        } )
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
      let min = input.querySelector( '.input-test-min' ).value
      let max = input.querySelector( '.input-test-max' ).value
      try {
        output.innerHTML = rnd( min, max )
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
