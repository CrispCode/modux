/* globals navigator, window */
'use strict'

import { loop } from './../utils/loop.js'
import { uid } from './../utils/uid.js'

/**
 * Class used to get device information
 */
export class Device {
  /**
   * Creates an instance of Device
   */
  constructor () {
    const ua = navigator.userAgent || navigator.vendor || window.opera

    let device = 'other'

    // get device
    if ( ua.match( /(iPhone)/ ) ) {
      device = 'iPhone'
    } else if ( ua.match( /(iPad)/ ) ) {
      device = 'iPad'
    } else if ( ua.match( /(iPod)/ ) ) {
      device = 'iPod'
    } else if ( ua.match( /(BlackBerry|BB10)/ ) ) {
      device = 'BlackBerry'
    } else if ( ua.match( /(IEMobile|windows phone)/ ) ) {
      device = 'WindowsMobile'
    } else if ( ua.match( /(Android)/ ) ) {
      device = 'Android'
    } else if ( ua.match( /(Macintosh)/ ) ) {
      device = 'Macintosh'
    } else if ( ua.match( /(Windows)/ ) ) {
      device = 'Windows'
    } else if ( ua.match( /(Linux)/ ) ) {
      device = 'Linux'
    }

    /**
     * Calls all the handlers bound to the window resize
     * @type {Function}
     * @private
     */
    this.__handlerListener = ( handler ) => {
      let orientation = ( window.innerHeight > window.innerWidth ) ? 'portrait' : 'landscape'
      handler( orientation )
    }

    /**
     * The handler for resize
     * @type {Function}
     * @private
     */
    this.__handlerResize = () => {
      loop( this.__listeners, ( handler ) => {
        this.__handlerListener( handler )
      } )
    }

    /**
     * Determines if any handlers are bound
     * @type {Boolean}
     * @private
     */
    this.__handlerBound = false

    /**
     * Holds the device type
     * @type {String}
     * @private
     */
    this.__device = device

    /**
     * Holds all the handlers bound
     * @type {Object}
     * @private
     */
    this.__listeners = {}
  }

  /**
   * Method used to attach a handler to the on resize event. Returns a function that can be called to remove the handler at a further date
   * @param {Function} listener A function containing one parameter which can be "landscape" or "portrait"
   * @return {Function}
   */
  onResize ( listener ) {
    let id = uid()
    this.__listeners[ id ] = listener
    if ( !this.__handlerBound ) {
      window.addEventListener( 'resize', this.__handlerResize )
      this.__handlerBound = true
    }

    this.__handlerListener( listener )

    return () => {
      delete this.__listeners[ id ]
      if ( Object.keys( this.__listeners ).length === 0 && this.__handlerBound ) {
        window.removeEventListener( 'resize', this.__handlerResize )
      }
    }
  }

  /**
   * Returns the device name
   * @return {String}
   */
  type () {
    return this.__device
  }

  /**
   * Returns true if the device is a desktop
   * @return {Boolean}
   */
  isDesktop () {
    return [ 'Windows', 'Linux', 'Macintosh', 'other' ].indexOf( this.__device ) !== -1
  }

  /**
   * Returns true if the device is a mobile device
   * @return {Boolean}
   */
  isMobile () {
    return [ 'Windows', 'Linux', 'Macintosh', 'other' ].indexOf( this.__device ) === -1
  }
}
