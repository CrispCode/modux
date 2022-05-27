'use strict'

/**
 * A class to mimic window.console
 */
class Logger {
  /**
   * Creates an instance of Logger
   * @param {String} [id] The identifier to appear before every output
   */
  constructor ( id ) {
    /**
     * Stores a unique identifier to pass to the begning of outputs
     * @private
     */
    this.__id = id || '[ APP ]'
    /**
     * Stores a boolean value which determines if output will be done or not
     * @private
     */
    this.__debug = false
  }

  /**
   * Create a new instance of the Logger
   * @return {Logger} The new Logger instance
   */
  create ( id ) {
    return new Logger( id )
  }

  /**
   * Used to give an identifier to the output
   * @param {String} id The identifier to appear before every output
   */
  setId ( id ) {
    this.__id = id
  }

  /**
   * Enable or disable the console output
   * @param {Boolean=false} [enabled] Use true if you want the output to appear
   */
  enabled ( enabled ) {
    this.__debug = enabled
  }

  /**
   * Wrapper for console.log
   */
  log () {
    if ( this.__debug ) {
      try {
        console.log.apply( this, [ this.__id, ...arguments ] )
      } catch ( e ) {}
    }
  }

  /**
   * Wrapper for console.info
   */
  info () {
    if ( this.__debug ) {
      try {
        console.info.apply( this, [ this.__id, ...arguments ] )
      } catch ( e ) {}
    }
  }

  /**
   * Wrapper for console.warn
   */
  warn () {
    if ( this.__debug ) {
      try {
        console.warn.apply( this, [ this.__id, ...arguments ] )
      } catch ( e ) {}
    }
  }

  /**
   * Wrapper for console.error
   */
  error () {
    if ( this.__debug ) {
      try {
        console.error.apply( this, [ this.__id, ...arguments ] )
      } catch ( e ) {}
    }
  }
}

/**
 * Returns a singleton of Logger
 */
export let logger = new Logger()
