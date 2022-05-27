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
   * @param {String} id A unique identifier for this file
   * @param {String} url The image url to load
   * @param {Image} image The image oject used to load the asset. If null a new one will be created.
   * @return {Promise} Returns a promise which is resolved upon loading
   */
  preloadImage ( id, url, image ) {
    let img = image || new Image()
    return new Promise( ( resolve, reject ) => {
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        this.__cache[ id ] = img
        resolve( this.__cache[ id ] )
      }
      img.onerror = ( err ) => {
        reject( err )
      }
      img.src = url
    } )
  }

  /**
   * Preload an audio file
   * @param {String} id A unique identifier for this file
   * @param {String} url The audio url to load
   * @param {Audio} audio The audio oject used to load the asset. If null a new one will be created.
   * @return {Promise} Returns a promise which is resolved upon loading
   */
  preloadAudio ( id, url, audio ) {
    let sound = audio || new Audio()
    return new Promise( ( resolve, reject ) => {
      sound.crossOrigin = 'anonymous'
      sound.addEventListener( 'canplay', () => {
        this.__cache[ id ] = sound
        resolve( this.__cache[ id ] )
      } )
      sound.onerror = ( err ) => {
        reject( err )
      }
      sound.src = url
    } )
  }

  /**
   * Preload a file using HTTPRequest
   * @param {String} id A unique identifier for this file
   * @param {String} url The file url to load
   * @param {XMLHttpRequest} request The xhr oject used to load the asset. If null a new one will be created.
   * @return {Promise} Returns a promise which is resolved upon loading
   */
  preloadFile ( id, url, request ) {
    let xhr = request || new XMLHttpRequest()
    return new Promise( ( resolve, reject ) => {
      xhr.open( 'GET', url )
      xhr.withCredentials = true
      xhr.onload = () => {
        this.__cache[ id ] = xhr.responseText
        resolve( this.__cache[ id ] )
      }
      xhr.onerror = ( err ) => {
        reject( err )
      }
      xhr.send()
    } )
  }

  /**
   * Load a list of files
   * @param {Object} files Contains a list of files to load with the following structure: { "file1": "url1", "file2": "url2" } or { "file1": { type: "image|audio|file", url: "url1", obj: objectLoader|null } }
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
        let obj = null
        let url = file
        if ( isObject( file ) ) {
          type = file.type
          url = file.url
          obj = file.obj || null
        }
        let loader = this[ 'preload' + type.charAt( 0 ).toUpperCase() + type.slice( 1 ).toLowerCase() ]
        loader.call( this, id, url, obj )
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

  /**
   * Returns a load file by id
   * @param {String} id
   * @return {Object}
   */
  get ( id ) {
    return this.__cache[ id ]
  }
}

/**
 * Returns a singleton of the Loader
 */
export let loader = new Loader()
