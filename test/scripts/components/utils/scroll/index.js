'use strict'

import { scroll, html } from './../../../../../src/scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  article1 () {
    return this._createTestElement( '<b>scroll</b> - A small library used to scroll html elements' )
  }

  article2 () {
    let test = this._createTestElement( 'Test for yourself element scrolling' )

    // Step 1
    let input = html( require( './test1.html' ) )
    let output = html( '<span></span>' )

    input.querySelector( '.button-test' ).addEventListener( 'click', () => {
      let h = input.querySelector( '.input-test-h' ).value || 0
      let v = input.querySelector( '.input-test-v' ).value || 0
      let cycles = input.querySelector( '.input-test-cycle' ).value || 1
      let e = input.querySelector( '.input-test-element' )
      try {
        scroll.elementScrollTo( e, Number.parseFloat( h ), Number.parseFloat( v ), Number.parseFloat( cycles ) )
        output.innerHTML = 'scroll.elementScrollTo( input.querySelector( \'.input-test-element\' ), ' + h + ', ' + v + ', ' + cycles + ' )'
      } catch ( e ) {
        output.innerHTML = e.message
      }
    } )

    let step = this._createStepElement( input, output )
    test.querySelector( '.steps' ).appendChild( step )

    return test
  }

  article3 () {
    let test = this._createTestElement( 'Test for yourself window scrolling' )

    // Step 1
    let input = html( require( './test2.html' ) )
    let output = html( '<span></span>' )

    let dummy = input.querySelector( '.input-test-dummy' )
    for ( let i = 0; i < 100; i++ ) {
      let text = html( '<p>DUMMY TEXT</p>' )
      dummy.appendChild( text )
    }

    input.querySelector( '.button-test1' ).addEventListener( 'click', () => {
      let h = input.querySelector( '.input-test-h' ).value || 0
      let v = input.querySelector( '.input-test-v' ).value || 0
      let cycles = input.querySelector( '.input-test-cycle' ).value || 1
      try {
        scroll.scrollTo( h, v, cycles )
        output.innerHTML = 'scroll.scrollTo( ' + h + ', ' + v + ', ' + cycles + ' )'
      } catch ( e ) {
        output.innerHTML = e.message
      }
    } )

    input.querySelector( '.button-test2' ).addEventListener( 'click', () => {
      try {
        scroll.scrollToTop( 50 )
        output.innerHTML = 'scroll.scrollToTop( 50 )'
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
    this.element.appendChild( this.article3() )
  }
}
