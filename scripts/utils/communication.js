/* globals XMLHttpRequest, FormData, document */

import { extend } from './extend.js'

/**
 * This class is responsible for server communication using http requests
 */
export class Communication {
  /**
   * Creates an instance of Communication
   * @param {FormData} [form] An existing form that would be sent
   */
  constructor ( form ) {
    /**
     * The FormData to use when sending the request, see https://developer.mozilla.org/en-US/docs/Web/API/FormData
     * @type {FormData}
     * @private
     */
    this.__form = new FormData( form )
    /**
     * The XMLHttpRequest to use in the request
     * @type {XMLHttpRequest}
     * @private
     */
    this.__request = new XMLHttpRequest()
    /**
     * Contains all the headers for the request
     * @type {Object}
     * @private
     */
    this.__headers = {}
  }

  /**
   * Returns the FormData object attached to the request. This makes it easier to control the fields.
   * @return {FormData} FormData attached to the request
   */
  get form () {
    return this.__form
  }

  /**
   * Sets a header to the request
   * @param {String} name Header name
   * @param {String} value Header value
   */
  setHeader ( name, value ) {
    this.__headers[ name ] = value
  }

  /**
   * Gets a header by key
   * @param {String} name Header name
   * @return {String} Header value
   */
  getHeader ( name ) {
    return this.__headers[ name ]
  }

  /**
   * Delete a header by key
   * @param {String} name Header name
   */
  deleteHeader ( name ) {
    delete this.__headers[ name ]
  }

  /**
   * Returns an object containing all the headers sets
   * @return {Object} Object containing all the headers
   */
  getHeaders () {
    return extend( {}, this.__headers )
  }

  /**
   * Clears all the set headers
   */
  clearHeaders () {
    this.__headers = {}
  }

  /**
   * Sets a listener to track the progress of the request
   * @param {Function} [progress=null] This function has two parameters, one parameter represents the progress value and the second is the event for onprogress
   * @param {Function} end This function has three parameters, one parameter is the error and one which contains the responseText, and the third one will contain the entire event of onloadend
   */
  listener ( progress, end ) {
    const self = this
    this.__request.onloadend = function ( ev ) {
      if ( self.__request.status === 200 ) {
        end( null, ev.target.responseText, ev )
      } else {
        end( self.__request.status, ev.target.responseText, ev )
      }
    }
    if ( progress ) {
      this.__request.onprogress = function ( ev ) {
        if ( ev.lengthComputable ) {
          progress( ev.loaded / ev.total, ev )
        } else {
          progress( null, ev )
        }
      }
    }
  }

  /**
   * Parse a url to the correct format
   * @param {String} url The url to request to
   */
  parseUrl ( url ) {
    let div = document.createElement( 'div' )
    div.innerHTML = '<a></a>'
    div.firstChild.href = url // Ensures that the href is properly escaped
    return div.firstChild.href
  }

  /**
   * Abort a request
   */
  cancel () {
    this.__request.abort()
  }

  /**
   * Initiate the request
   * @param {String} url The url to request to
   * @param {String} method Either POST or GET
   */
  send ( url, method ) {
    url = this.parseUrl( url )
    this.__request.open( method.toUpperCase(), url )
    for ( let i = 0, k = Object.keys( this.__headers ), l = k.length; i < l; i++ ) {
      this.__request.setRequestHeader( k[ i ], this.__headers[ k[ i ] ] )
    }
    this.__request.send( this.__form )
  }

  /**
   * Initiate a POST request
   * @param {String} url The url to request to
   */
  post ( url ) {
    this.send( url, 'POST' )
  }

  /**
   * Initiate a GET request
   * @param {String} url The url to request to
   */
  get ( url ) {
    this.send( url, 'GET' )
  }
}
