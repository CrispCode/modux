'use strict'

import { Communication } from './../../../../../src/scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  article1 () {
    let test = this._createTestElement( '<b>Communication</b> - The Communication class, used to handle http requests' )

    // Step 1
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `let comm = new Communication()<br/>
         comm.listener( null, ( err, response ) => {<br/>
         &nbsp;&nbsp;if ( err ) {<br/>
         &nbsp;&nbsp;&nbsp;&nbsp;reject( err )<br/>
         &nbsp;&nbsp;&nbsp;&nbsp;return<br/>
         &nbsp;&nbsp;}<br/>
         &nbsp;&nbsp;resolve( response )<br/>
         } )<br/>
         comm.get( '/text.txt' )<br/>`,
        () => {
          return new Promise( ( resolve, reject ) => {
            let comm = new Communication()
            comm.listener( null, ( err, response ) => {
              if ( err ) {
                reject( err )
                return
              }
              resolve( response )
            } )
            comm.get( '/text.txt' )
          } )
        },
        () => Promise.resolve( 'A text file.\nThis file contains some dummy text.\n\nThe quick brown fox jumps over the lazy dog!' )
      )
    )

    // Step 2
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `let comm = new Communication()<br/>
         comm.listener( null, ( err, response ) => {<br/>
         &nbsp;&nbsp;if ( err ) {<br/>
         &nbsp;&nbsp;&nbsp;&nbsp;resolve( err )<br/>
         &nbsp;&nbsp;&nbsp;&nbsp;return<br/>
         &nbsp;&nbsp;}<br/>
         &nbsp;&nbsp;resolve( response )<br/>
         } )<br/>
         comm.get( '/not-found.txt' )<br/>`,
        () => {
          return new Promise( ( resolve ) => {
            let comm = new Communication()
            comm.listener( null, ( err, response ) => {
              if ( err ) {
                resolve( err )
                return
              }
              resolve( response )
            } )
            comm.get( '/not-found.txt' )
          } )
        },
        () => Promise.resolve( 404 )
      )
    )

    // Step 3
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `let comm = new Communication()<br/>
         comm.form.append( 'v3', 'var3' )<br/>
         comm.form.append( 'v4', 'var4' )<br/>
         comm.listener( null, ( err, response ) => {<br/>
         &nbsp;&nbsp;if ( err ) {<br/>
         &nbsp;&nbsp;&nbsp;&nbsp;reject( err )<br/>
         &nbsp;&nbsp;&nbsp;&nbsp;return<br/>
         &nbsp;&nbsp;}<br/>
         &nbsp;&nbsp;resolve( response )<br/>
         } )<br/>
         comm.post( '/what-did-i-send?v1=var1&v2=var2' )`,
        () => {
          return new Promise( ( resolve, reject ) => {
            let comm = new Communication()

            comm.form.append( 'v3', 'var3' )
            comm.form.append( 'v4', 'var4' )

            comm.listener( null, ( err, response ) => {
              if ( err ) {
                reject( err )
                return
              }
              resolve( response )
            } )
            comm.post( '/what-did-i-send?v1=var1&v2=var2' )
          } )
        },
        () => Promise.resolve( JSON.stringify( { 'v3': 'var3', 'v4': 'var4' } ) )
      )
    )

    return test
  }

  execute () {
    this.element.appendChild( this.article1() )
    // this.element.appendChild( this.article2() )
  }
}
