'use strict'

import { loader } from './../../../../../scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  article1 () {
    let test = this._createTestElement( '<b>loader</b> - Loader class, used to preload files' )

    // Step 1
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
        const resources = loader.create()<br/>
        resources.preload( [<br/>
        &nbsp;&nbsp;{<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;type: 'image',<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;url: '/image1.png'<br/>
        &nbsp;&nbsp;}<br/>
        ] )<br/>
        &nbsp;&nbsp;.then( () => {<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;resolve( 'File loaded "/image.png"' )<br/>
        &nbsp;&nbsp;} )
        `,
        () => {
          const resources = loader.create()
          return new Promise( ( resolve ) => {
            resources.preload( [ {
              type: 'image',
              url: '/image1.png'
            }
            ] )
              .then( () => {
                resolve( 'File loaded "/image1.png"' )
              } )
          } )
        },
        () => Promise.resolve( 'File loaded "/image1.png"' )
      )
    )

    // Step 2
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
        const resources = loader.create()<br/>
        resources.preload( {<br/>
        &nbsp;&nbsp;image: { type: 'image', url: '/image2.png' },<br/>
        &nbsp;&nbsp;audio: { type: 'audio', url: '/audio.wav' }<br/>
        } )<br/>
        &nbsp;&nbsp;.then( () => {<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;resolve( 'Files loaded.' )<br/>
        &nbsp;&nbsp;} )
        `,
        () => {
          const resources = loader.create()
          return new Promise( ( resolve ) => {
            resources.preload( {
              image: { type: 'image', url: '/image2.png' },
              audio: { type: 'audio', url: '/audio.wav' }
            } )
              .then( () => {
                resolve( 'Files loaded.' )
              } )
          } )
        },
        () => Promise.resolve( 'Files loaded.' )
      )
    )

    // Step 3
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
        const resources = loader.create()<br/>
        let output = []<br/>
        resources.preload( {<br/>
        &nbsp;&nbsp;image: { type: 'image', url: '/image2.png' },<br/>
        &nbsp;&nbsp;audio: { type: 'audio', url: '/ding.wav' }<br/>
        }, ( err, id, data, loaded, total ) => {<br/>
        &nbsp;&nbsp;output.push( { err: err, id: id, loaded: loaded, total: total } )<br/>
        } )<br/>
        &nbsp;&nbsp;.then( () => {<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;resolve( JSON.stringify( output, null, 4 ) )<br/>
        &nbsp;&nbsp;} )
        `,
        () => {
          const resources = loader.create()
          return new Promise( ( resolve ) => {
            let output = []
            resources.preload( {
              image: { type: 'image', url: '/image2.png' },
              audio: { type: 'audio', url: '/ding.wav' }
            }, ( err, id, data, loaded, total ) => {
              output.push( { err: err, id: id, loaded: loaded, total: total } )
            } )
              .then( () => {
                resolve( JSON.stringify( output, null, 4 ) )
              } )
          } )
        },
        () => Promise.resolve( JSON.stringify( [
          { err: null, id: 'image', loaded: 1, total: 2 },
          { err: null, id: 'audio', loaded: 2, total: 2 }
        ], null, 4 ) )
      )
    )

    // Step 4
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
        const resources = loader.create()<br/>
        resources.preload( {<br/>
        &nbsp;&nbsp;image: { type: 'image', url: '/image2.png' },<br/>
        &nbsp;&nbsp;audio: { type: 'audio', url: '/audio.wav' }<br/>
        } )<br/>
        &nbsp;&nbsp;.then( () => {<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;resolve( Object.keys( resources.getCache() ).length )<br/>
        &nbsp;&nbsp;} )
        `,
        () => {
          const resources = loader.create()
          return new Promise( ( resolve ) => {
            resources.preload( {
              image: { type: 'image', url: '/image2.png' },
              audio: { type: 'audio', url: '/ding.wav' }
            } )
              .then( () => {
                resolve( Object.keys( resources.getCache() ).length )
              } )
          } )
        },
        () => Promise.resolve( 2 )
      )
    )

    // Step 5
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
        const resources = loader.create()<br/>
        resources.preload( {<br/>
        &nbsp;&nbsp;text: { type: 'file', url: '/text.txt' }<br/>
        } )<br/>
        &nbsp;&nbsp;.then( () => {<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;resolve( resources.get( 'text' ) )<br/>
        &nbsp;&nbsp;} )
        `,
        () => {
          const resources = loader.create()
          return new Promise( ( resolve ) => {
            resources.preload( {
              text: { type: 'file', url: '/text.txt' }
            } )
              .then( () => {
                resolve( resources.get( 'text' ) )
              } )
          } )
        },
        () => Promise.resolve( 'A text file.\nThis file contains some dummy text.\n\nThe quick brown fox jumps over the lazy dog!' )
      )
    )

    // Step 6
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
            const resources = loader.create()<br/>
            resources.preload( {<br/>
            &nbsp;&nbsp;image: { type: 'image', url: '/image1.png' }<br/>
            } )<br/>
            &nbsp;&nbsp;.then( () => {<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;resolve( typeof resources.get( 'image' ) )<br/>
            &nbsp;&nbsp;} )
            `,
        () => {
          const resources = loader.create()
          return new Promise( ( resolve ) => {
            resources.preload( {
              image: { type: 'image', url: '/image1.png' }
            } )
              .then( () => {
                resolve( typeof resources.get( 'image' ) )
              } )
          } )
        },
        () => Promise.resolve( 'object' )
      )
    )

    return test
  }

  execute () {
    this.element.appendChild( this.article1() )
  }
}
