/* globals window, document */

'use strict'

import { loop } from './loop'

/**
 * This class is responsible for parsing and matching urls
 */
export class Url {
  /**
   * Creates an instance of Url
   * @param {String} url A url string. If no url is provided window.location.href is used
   */
  constructor ( url ) {
    /**
     * Contains regular expressions used for splitting the url
     * @type {Object}
     * @private
     */
    this.__regexp = {
      protocol: '(?<protocol>[^:]+):\\/\\/',
      host: '(?<host>[^\\/\\?#]+)',
      path: '(?<path>\\/[^\\?#]*)?',
      parameters: '(?<parameters>\\?[^#]*)?',
      hash: '(?<hash>#.*)?'
    }

    /**
     * Contains the url provided
     * @type {String}
     * @private
     */
    this.__url = ''

    /**
     * Contains all the parts of the url
     * @type {Object}
     * @private
     */
    this.__parts = {
      protocol: null,
      host: null,
      path: null,
      parameters: null,
      hash: null,
      username: null,
      password: null
    }

    this.set( url )
  }

  /**
   * Parse a url to the correct format
   * @param {String} url The url string to be parsed
   * @return {String} The parsed version of the url
   * @private
   */
  __parseUrl ( url ) {
    let div = document.createElement( 'div' )
    div.innerHTML = '<a></a>'
    div.firstChild.href = url // Ensures that the href is properly escaped
    return div.firstChild.href
  }

  /**
   * Split the url into parts based on the url regular expression
   * @private
   */
  __split () {
    let regexp = new RegExp( '^' + this.__regexp.protocol + this.__regexp.host + this.__regexp.path + this.__regexp.parameters + this.__regexp.hash + '$', 'i' )
    let parts = this.__url.match( regexp )
    if ( parts ) {
      this.__parts.protocol = parts.groups[ 'protocol' ] || null
      this.__parts.path = parts.groups[ 'path' ] || null
      this.__parts.hash = ( parts.groups[ 'hash' ] ) ? parts.groups[ 'hash' ].substring( 1 ) : null

      this.__parts.host = parts.groups[ 'host' ] || null
      // Split host, username and password if needed
      if ( this.__parts.host ) {
        let hostParts = this.__parts.host.split( '@' )
        if ( hostParts[ 1 ] ) {
          // We have a username and password so we need to update those parts
          let authentication = hostParts[ 0 ].split( ':' )
          this.__parts.username = authentication[ 0 ]
          this.__parts.password = authentication[ 1 ]
          this.__parts.host = hostParts[ 1 ]
        } else {
          // We dont have a username and password so we need to update those parts
          this.__parts.username = null
          this.__parts.password = null
          this.__parts.host = hostParts[ 0 ]
        }
      }

      this.__parts.parameters = parts.groups[ 'parameters' ] || null
      // Split the parameters into an object
      if ( this.__parts.parameters ) {
        let parameters = {}
        let groups = this.__parts.parameters.split( '?' )[ 1 ].split( '&' )
        loop( groups, ( group ) => {
          let pair = group.split( '=' )
          if ( pair[ 0 ] !== '' ) {
            parameters[ pair[ 0 ] ] = ( pair[ 1 ] !== undefined ) ? pair[ 1 ] : true
          }
        } )
        this.__parts.parameters = parameters
      } else {
        this.__parts.parameters = {}
      }
    }
  }

  /**
   * Returns the protocol of the url
   * @return {String} The string containing the protocol
   */
  get protocol () {
    return this.__parts.protocol
  }
  /**
   * Returns the host and port of the url
   * @return {String} The string containing the hostname and port
   */
  get host () {
    return this.__parts.host
  }
  /**
   * Returns the path of the url
   * @return {String} The string containing the path
   */
  get path () {
    return this.__parts.path
  }
  /**
   * Returns the parameters of the url
   * @return {Object} The query string parameters of the url
   */
  get parameters () {
    return this.__parts.parameters
  }
  /**
   * Returns the hash of the url
   * @return {String} The hash of the url
   */
  get hash () {
    return this.__parts.hash
  }
  /**
   * Returns the username from the url
   * @return {String} The username from the url
   */
  get username () {
    return this.__parts.username
  }
  /**
   * Returns the password from the url
   * @return {String} The password from the url
   */
  get password () {
    return this.__parts.password
  }
  /**
   * Returns all the parts of the url
   * @return {Object} The object containing all the url parts
   */
  get parts () {
    return this.__parts
  }

  /**
   * Return the url
   * @return {String} The provided url
   */
  toString () {
    return this.__url
  }

  /**
   * Set the url string
   * @param {String} url The url string
   * @return {Url} The instance of the Url class
   */
  set ( url ) {
    this.__url = ( url ) ? this.__parseUrl( url ) : window.location.href
    this.__split()
    return this
  }
}
