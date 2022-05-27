/* globals navigator, window */

'use strict'

/**
 * Returns the device type based on user agent
 * @return {String}
 */
const getDeviceTypeByUa = () => {
  const ua = navigator.userAgent || navigator.vendor || window.opera

  let type = 'other'

  // get device
  if ( ua.match( /(iPhone)/ ) ) {
    type = 'iPhone'
  } else if ( ua.match( /(iPad)/ ) ) {
    type = 'iPad'
  } else if ( ua.match( /(iPod)/ ) ) {
    type = 'iPod'
  } else if ( ua.match( /(BlackBerry|BB10)/ ) ) {
    type = 'BlackBerry'
  } else if ( ua.match( /(IEMobile|windows phone)/ ) ) {
    type = 'WindowsMobile'
  } else if ( ua.match( /(Android)/ ) ) {
    type = 'Android'
  } else if ( ua.match( /(Macintosh)/ ) ) {
    type = 'Macintosh'
  } else if ( ua.match( /(Windows)/ ) ) {
    type = 'Windows'
  } else if ( ua.match( /(Linux)/ ) ) {
    type = 'Linux'
  }

  return type
}

/**
 * A static class which is used to get device information
 */
export class Device {
  /**
   * Returns the device name
   * @return {String}
   */
  static type () {
    return getDeviceTypeByUa()
  }

  /**
   * Returns true if the device is a desktop
   * @return {Boolean}
   */
  static isDesktop () {
    return [ 'Windows', 'Linux', 'Macintosh', 'other' ].indexOf( getDeviceTypeByUa() ) !== -1
  }

  /**
   * Returns true if the device is a mobile device
   * @return {Boolean}
   */
  static isMobile () {
    return [ 'Windows', 'Linux', 'Macintosh', 'other' ].indexOf( getDeviceTypeByUa() ) === -1
  }
}
