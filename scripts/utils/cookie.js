/* globals document */

'use strict'

/**
 * Static cookie class
 */
export class Cookie {
  /**
   * Set a browser cookie
   * @param {String} name Name of the cookie
   * @param {String} value Value of the cookie
   * @param {String} path The cookie path
   * @param {Numeric} seconds The cookie lifetime
   */
  static set ( name, value, path, seconds ) {
    let expires
    if ( seconds ) {
      let date = new Date()
      date.setTime( date.getTime() + ( seconds * 1000 ) )
      expires = '; expires=' + date.toGMTString()
    } else {
      expires = ''
    }
    document.cookie = name + '=' + value + expires + '; path=' + ( path || '/' )
  }

  /**
   * Returns the value of a browser cookie
   * @param {String} name Name of the cookie to be retrieved
   * @return {String} Returns the value of the cookie
   */
  static get ( name ) {
    name = name + '='
    var decodedCookie = decodeURIComponent( document.cookie )
    var cookies = decodedCookie.split( ';' )
    for ( var i = 0; i < cookies.length; i++ ) {
      var cookie = cookies[ i ]
      while ( cookie.charAt( 0 ) === ' ' ) {
        cookie = cookie.substring( 1 )
      }
      if ( cookie.indexOf( name ) === 0 ) {
        return cookie.substring( name.length, cookie.length )
      }
    }
    return ''
  }
}
