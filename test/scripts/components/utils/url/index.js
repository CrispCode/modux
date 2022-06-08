/* globals window */

'use strict'

import { Url, html } from './../../../../../src/scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  article1 () {
    let test = this._createTestElement( '<b>url</b> - Url class, used for url parsing' )

    // Step 1
    let s1 = new Url( window.location.href )
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
        let url = new Url( ` + window.location.href + ` )<br/>
        console.log( url.parts )
        `,
        () => Promise.resolve( JSON.stringify( s1.parts, null, 4 ) ),
        () => Promise.resolve( JSON.stringify( s1.parts, null, 4 ) )
      )
    )

    // Step 2
    let s2 = new Url( 'https://github.com/CrispCode/modux?name=vlad#latest' )
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
        let url = new Url( 'https://github.com/CrispCode/modux?name=vlad#latest' )<br/>
        console.log( url.parts )
        `,
        () => Promise.resolve( JSON.stringify( s2.parts, null, 4 ) ),
        () => Promise.resolve( JSON.stringify( {
          protocol: 'https',
          host: 'github.com',
          path: '/CrispCode/modux',
          parameters: {
            name: 'vlad'
          },
          hash: 'latest',
          username: null,
          password: null
        }, null, 4 ) )
      )
    )

    // Step 3
    let s3 = new Url( '/CrispCode/modux#latest' )
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
        let url = new Url( '/CrispCode/modux#latest' )<br/>
        console.log( url.parts )
        `,
        () => Promise.resolve( JSON.stringify( s3.parts, null, 4 ) ),
        () => Promise.resolve( JSON.stringify( {
          protocol: 'http',
          host: window.location.host,
          path: '/CrispCode/modux',
          parameters: {},
          hash: 'latest',
          username: null,
          password: null
        }, null, 4 ) )
      )
    )

    // Step 4
    let s4 = new Url( 'https://developer.mozilla.org/en-US?test1&test2=2' )
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
        let url = new Url( 'https://developer.mozilla.org/en-US?test1&test2=2' )<br/>
        console.log( url.parts )
        `,
        () => Promise.resolve( JSON.stringify( s4.parts, null, 4 ) ),
        () => Promise.resolve( JSON.stringify( {
          protocol: 'https',
          host: 'developer.mozilla.org',
          path: '/en-US',
          parameters: {
            test1: true,
            test2: '2'
          },
          hash: null,
          username: null,
          password: null
        }, null, 4 ) )
      )
    )

    // Step 5
    let s5 = new Url( 'https://developer.mozilla.org?test1' )
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
        let url = new Url( 'https://developer.mozilla.org?test1' )<br/>
        console.log( url.parts )
        `,
        () => Promise.resolve( JSON.stringify( s5.parts, null, 4 ) ),
        () => Promise.resolve( JSON.stringify( {
          protocol: 'https',
          host: 'developer.mozilla.org',
          path: '/',
          parameters: {
            test1: true
          },
          hash: null,
          username: null,
          password: null
        }, null, 4 ) )
      )
    )

    // Step 6
    let s6 = new Url( 'https://developer.mozilla.org#test1' )
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
        let url = new Url( 'https://developer.mozilla.org#test1' )<br/>
        console.log( url.parts )
        `,
        () => Promise.resolve( JSON.stringify( s6.parts, null, 4 ) ),
        () => Promise.resolve( JSON.stringify( {
          protocol: 'https',
          host: 'developer.mozilla.org',
          path: '/',
          parameters: {},
          hash: 'test1',
          username: null,
          password: null
        }, null, 4 ) )
      )
    )

    // Step 7
    let s7 = new Url( 'https://developer.mozilla.org' )
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
        let url = new Url( 'https://developer.mozilla.org' )<br/>
        console.log( url.parts )
        `,
        () => Promise.resolve( JSON.stringify( s7.parts, null, 4 ) ),
        () => Promise.resolve( JSON.stringify( {
          protocol: 'https',
          host: 'developer.mozilla.org',
          path: '/',
          parameters: {},
          hash: null,
          username: null,
          password: null
        }, null, 4 ) )
      )
    )

    // Step 8
    let s8 = new Url( 'https://usr:pass@developer.mozilla.org' )
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
        let url = new Url( 'https://usr:pass@developer.mozilla.org' )<br/>
        console.log( url.parts )
        `,
        () => Promise.resolve( JSON.stringify( s8.parts, null, 4 ) ),
        () => Promise.resolve( JSON.stringify( {
          protocol: 'https',
          host: 'developer.mozilla.org',
          path: '/',
          parameters: {},
          hash: null,
          username: 'usr',
          password: 'pass'
        }, null, 4 ) )
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
      let str = input.querySelector( '.input-test-url' ).value

      try {
        let url = new Url( str )
        output.innerHTML = JSON.stringify( url.parts, null, 4 )
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
