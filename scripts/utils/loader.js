/* globals XMLHttpRequest, Image, Audio */

'use strict'

import { loop } from './loop.js'
import { isObject } from './isobject.js'

/**
 * The Loader class is used to preload files
 */
class Loader {
  /**
   * Creates an instance of the Loader class
   */
  constructor () {
    /**
     * Contains a cache of files
     * @type {Object}
     * @private
     */
    this.__cache = {}
  }

  /**
   * Create a new instance of the Loader
   * @return {Loader} The new Loader instance
   */
  create () {
    return new Loader()
  }

  /**
   * Preload an image
   * @param {String} url The image url to load
   * @return {Promise} Returns a promise which is resolved upon loading
   */
  preloadImage ( url ) {
    let img = new Image()
    return new Promise( ( resolve, reject ) => {
      img.onload = () => {
        this.__cache[ url ] = img
        resolve( this.__cache[ url ] )
      }
      img.onerror = ( err ) => {
        reject( err )
      }
      img.src = url
    } )
  }

  /**
   * Preload an audio file
   * @param {String} url The audio url to load
   * @return {Promise} Returns a promise which is resolved upon loading
   */
  preloadAudio ( url ) {
    let audio = new Audio()
    return new Promise( ( resolve, reject ) => {
      audio.addEventListener( 'canplay', () => {
        this.__cache[ url ] = audio
        resolve( this.__cache[ url ] )
      } )
      audio.onerror = ( err ) => {
        reject( err )
      }
      audio.src = url
    } )
  }

  /**
   * Preload a file using HTTPRequest
   * @param {String} url The file url to load
   * @return {Promise} Returns a promise which is resolved upon loading
   */
  preloadFile ( url ) {
    let xhr = new XMLHttpRequest()
    return new Promise( ( resolve, reject ) => {
      xhr.open( 'GET', url )
      xhr.onload = () => {
        this.__cache[ url ] = url
        resolve( this.__cache[ url ] )
      }
      xhr.onerror = ( err ) => {
        reject( err )
      }
      xhr.send()
    } )
  }

  /**
   * Load a list of files
   * @param {Object} files Contains a list of files to load
   * @param {Function} progress A callback function with the parameters: "err, id, data, loaded, total"
   * @return {Promise} Returns a promise which is resolved upon loading all files, doesn't matter if they failed or not
   */
  preload ( files, progress ) {
    return new Promise( ( resolve ) => {
      let total = Object.keys( files ).length
      let loaded = 0
      let index = 0

      let process = ( err, id, data, loaded, total ) => {
        if ( typeof progress === 'function' ) {
          progress( err, id, data, loaded, total )
        }
        index++
        if ( total === index ) {
          resolve( total - loaded )
        }
      }

      if ( total === 0 ) {
        resolve( 0 )
      }

      loop( files, ( file, id ) => {
        let type = 'file'
        let url = file
        if ( isObject( file ) ) {
          type = file.type
          url = file.url
        }
        let loader = this[ 'preload' + type.charAt( 0 ).toUpperCase() + type.slice( 1 ).toLowerCase() ]
        loader.call( this, url )
          .then( ( data ) => {
            loaded++
            process( null, id, data, loaded, total )
          } )
          .catch( ( err ) => {
            process( err, id, null, loaded, total )
          } )
      } )
    } )
  }

  /**
   * Returns the cache containing the preloaded files
   * @return {Object}
   */
  getCache () {
    return this.__cache
  }
}

/**
 * Returns a singleton of the Loader
 */
export let loader = new Loader()
