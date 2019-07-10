/* globals XMLHttpRequest, FormData, document */

import { loop } from './../utils/loop.js'

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
     * The FormData to use when sending the request
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
   * Adds a field to the request
   * @param {String} key Field name
   * @param {String} value Field value
   */
  addField ( key, value ) {
    this.__form.append( key, value )
  }

  /**
   * Adds a list of fields to the request
   * @param {Object} fields The object properties become the parameters and the values are the parameter values
   */
  addFields ( fields ) {
    loop( fields, ( value, key ) => {
      this.__form.append( key, value )
    } )
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
